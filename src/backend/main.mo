import Array "mo:core/Array";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat32 "mo:core/Nat32";
import Nat16 "mo:core/Nat16";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
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

  public type BondListingWithId = {
    bondId : Nat32;
    listing : BondListing;
  };

  let bonds = Map.empty<Nat32, BondListing>();
  let userInvestments = Map.empty<Principal, [Investment]>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  module BondListing {
    public func compare(a : BondListing, b : BondListing) : Order.Order {
      Text.compare(a.issuer, b.issuer);
    };
  };

  func toBondListingArray(map : Map.Map<Nat32, BondListing>) : [BondListing] {
    map.values().toArray();
  };

  // Update bond listing launch dates
  public shared ({ caller }) func updateBondListingDates() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized access, admin role required! ");
    };
    // New date: 1 February 2026 (interpreted as DD-MM-YYYY)
    let updatedBonds = bonds.map<Nat32, BondListing, BondListing>(
      func(_id, bond) {
        { bond with launchDate = 177528660000000000 };
      }
    );
    bonds.clear();
    for ((k, v) in updatedBonds.entries()) {
      bonds.add(k, v);
    };
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

  // Bond Listings (Public - no auth required for viewing)
  public query ({ caller }) func getBondListings() : async [BondListing] {
    toBondListingArray(bonds);
  };

  // New backend query that exposes bond IDs
  public query ({ caller }) func getBondListingsWithIds() : async [BondListingWithId] {
    bonds.toArray().map(func((id, listing)) { { bondId = id; listing } });
  };

  public query ({ caller }) func getBondListing(bondId : Nat32) : async ?BondListing {
    bonds.get(bondId);
  };

  // Admin-only: Add new bond listing
  public shared ({ caller }) func addBondListing(bondId : Nat32, listing : BondListing) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add bond listings");
    };
    bonds.add(bondId, listing);
  };

  // Admin-only: Update bond listing
  public shared ({ caller }) func updateBondListing(bondId : Nat32, listing : BondListing) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update bond listings");
    };
    switch (bonds.get(bondId)) {
      case (null) { Runtime.trap("Bond not found") };
      case (?_) { bonds.add(bondId, listing) };
    };
  };

  // Admin-only: Remove bond listing
  public shared ({ caller }) func removeBondListing(bondId : Nat32) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can remove bond listings");
    };
    bonds.remove(bondId);
  };

  // Admin-only: Bulk update coupon rates
  public shared ({ caller }) func bulkUpdateCouponRates() : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform bulk updates");
    };

    let oldThreshold : Nat16 = 1245; // 12.45%
    let newRate : Nat16 = 1528; // 15.28%
    var updatedCount : Nat = 0;

    for ((bondId, bond) in bonds.entries()) {
      if (bond.couponRate >= oldThreshold) {
        let updatedBond = {
          bond with couponRate = newRate
        };
        bonds.add(bondId, updatedBond);
        updatedCount += 1;
      };
    };

    updatedCount;
  };

  // Investment Operations (User-only with KYC verification)
  public shared ({ caller }) func invest(bondId : Nat32, amount : Nat, diversification : Diversification) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can invest");
    };

    // Verify KYC status
    let profile = switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile not found. Please complete your profile first.") };
      case (?p) { p };
    };

    switch (profile.kycStatus) {
      case (#verified) { /* OK to proceed */ };
      case (#pending) { Runtime.trap("KYC verification pending. Please wait for approval.") };
      case (#rejected) { Runtime.trap("KYC verification rejected. Please contact support.") };
    };

    let bond = switch (bonds.get(bondId)) {
      case (null) { Runtime.trap("Bond not found") };
      case (?bond) { bond };
    };

    // Verify bond is active
    switch (bond.status) {
      case (#active()) { /* OK to proceed */ };
      case (_) { Runtime.trap("Bond is not available for investment") };
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

  // Admin-only: View any user's portfolio
  public query ({ caller }) func getAdminUserPortfolio(user : Principal) : async PortfolioSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view other users' portfolios");
    };

    let investments = switch (userInvestments.get(user)) {
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
