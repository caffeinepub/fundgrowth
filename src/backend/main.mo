import Array "mo:core/Array";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat32 "mo:core/Nat32";
import Nat16 "mo:core/Nat16";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type CouponType = { #zeroCoupon : (); #coupon : Nat };
  public type RepaymentFrequency = { #monthly : (); #quarterly : (); #annually : () };
  public type RedemptionType = { #bulletRepayment : (); #staggeredRedemption : (); #prepayment : () };
  public type RiskTag = { #secured; #unsecured; #seniorSecured; #securedByMovableAssets };
  public type BondStatus = {
    #active : ();
    #matured : Time.Time;
    #fullyRedeemed : ();
    #defaulted : ();
  };
  public type RepaymentStatus = { #paid; #pending; #overdue; #defaulted };
  public type Diversification = { #investmentAmount : Nat; #riskLevel : Text };

  public type BondListing = {
    issuer : Text;
    rating : Char;
    tenure : Nat; // months
    couponRate : Nat16; // Integer representation of percentage (e.g., 850 = 8.5%)
    couponType : CouponType;
    minInvestment : Nat;
    ratingAgency : Text;
    repaymentFrequency : RepaymentFrequency;
    redemptionType : RedemptionType;
    riskTags : [RiskTag];
    status : BondStatus;
    faceValue : Nat;
    launchDate : Time.Time;
    diversification : Diversification;
  };

  public type Investment = {
    bondId : Nat32;
    amount : Nat;
    investedOn : Time.Time;
    isActive : Bool;
    repayments : [Repayment];
    investmentPlan : Diversification;
  };

  public type Repayment = {
    dueDate : Time.Time;
    amount : Nat;
    interestAmount : Nat;
    status : RepaymentStatus;
    principalComponent : Nat;
  };

  public type PortfolioSummary = {
    activeHoldings : [Investment];
    totalInvested : Nat;
    investmentDistribution : Diversification;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phoneNumber : Text;
    kycStatus : { #pending; #verified; #rejected };
  };

  type bondsMap = Map.Map<Nat32, BondListing>;
  type userInvestmentsMap = Map.Map<Principal, [Investment]>;
  type userProfilesMap = Map.Map<Principal, UserProfile>;

  let bonds : bondsMap = Map.empty<Nat32, BondListing>();
  let userInvestments : userInvestmentsMap = Map.empty<Principal, [Investment]>();
  let userProfiles : userProfilesMap = Map.empty<Principal, UserProfile>();

  module BondListing {
    public func compare(a : BondListing, b : BondListing) : Order.Order {
      Text.compare(a.issuer, b.issuer);
    };
  };

  func toBondListingArray(map : bondsMap) : [BondListing] {
    map.values().toArray();
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Bond Listings (Public - no auth required)
  public query ({ caller }) func getBondListings() : async [BondListing] {
    toBondListingArray(bonds);
  };

  public query ({ caller }) func getBondListing(bondId : Nat32) : async ?BondListing {
    bonds.get(bondId);
  };

  // Investment Operations (User-only)
  public shared ({ caller }) func invest(bondId : Nat32, amount : Nat, diversification : Diversification) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can invest");
    };
    let bond = switch (bonds.get(bondId)) {
      case (null) { Runtime.trap("Bond not found") };
      case (?bond) { bond };
    };
    if (amount < bond.minInvestment) {
      Runtime.trap("Investment below minimum amount");
    };
    let investment = {
      bondId;
      amount;
      investedOn = Time.now();
      isActive = true;
      repayments = [];
      investmentPlan = diversification;
    };

    let currentInvestments = switch (userInvestments.get(caller)) {
      case (null) { [] };
      case (?existing) { existing };
    };
    let newInvestments = currentInvestments.concat([investment]);
    userInvestments.add(caller, newInvestments);
  };

  // Admin Operations
  public shared ({ caller }) func initializeDefaultBonds() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can initialize bonds");
    };

    let defaultBonds : [(Nat32, BondListing)] = [
      (
        1,
        {
          issuer = "AgroFintech Ltd.";
          rating = 'A';
          tenure = 24;
          couponRate = 850; // 8.5%
          couponType = #coupon(780);
          minInvestment = 10000;
          ratingAgency = "CRISIL";
          repaymentFrequency = #quarterly;
          redemptionType = #bulletRepayment;
          riskTags = [#secured];
          status = #active(());
          faceValue = 1000000;
          launchDate = Time.now();
          diversification = #investmentAmount(50000);
        },
      ),
    ];

    for ((id, bond) in defaultBonds.values()) {
      bonds.add(id, bond);
    };
  };

  // Portfolio Management (User-only)
  public query ({ caller }) func getUserPortfolio() : async PortfolioSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view portfolio");
    };
    let investments = switch (userInvestments.get(caller)) {
      case (null) { [] };
      case (?list) { list };
    };
    let totalInvested = investments.foldLeft(0, func(acc, inv) { acc + inv.amount });

    let investmentDistribution : Diversification = switch (getInvestmentPlan(investments)) {
      case (?plan) { plan };
      case (null) { #investmentAmount(0) };
    };

    {
      activeHoldings = investments;
      totalInvested;
      investmentDistribution;
    };
  };

  func getInvestmentPlan(investments : [Investment]) : ?Diversification {
    for (inv in investments.values()) {
      return ?inv.investmentPlan;
    };
    null;
  };
};
