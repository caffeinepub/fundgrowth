import AuthGate from '../components/auth/AuthGate';
import { useGetUserPortfolio, useGetBondListings } from '@/hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Wallet, PieChart } from 'lucide-react';
import { formatCurrency, formatDateTime } from '@/lib/formatters';
import { Link } from '@tanstack/react-router';

export default function DashboardPage() {
  return (
    <AuthGate>
      <DashboardPageContent />
    </AuthGate>
  );
}

function DashboardPageContent() {
  const { data: portfolio, isLoading: portfolioLoading } = useGetUserPortfolio();
  const { data: bonds } = useGetBondListings();

  const getBondName = (bondId: number): string => {
    if (!bonds) return `Bond #${bondId}`;
    const bond = bonds[bondId - 1];
    return bond ? bond.issuer : `Bond #${bondId}`;
  };

  if (portfolioLoading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  const activeInvestments = portfolio?.activeHoldings.filter((inv) => inv.isActive) || [];
  const totalInvested = portfolio?.totalInvested || BigInt(0);

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
            Investment Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your bond investments and portfolio performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeInvestments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Active</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Investments</CardTitle>
          </CardHeader>
          <CardContent>
            {activeInvestments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't made any investments yet.</p>
                <Link
                  to="/bonds"
                  className="text-primary hover:underline font-medium"
                >
                  Browse available bonds
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bond</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Invested On</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeInvestments.map((investment, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Link
                            to="/bonds/$bondId"
                            params={{ bondId: String(investment.bondId) }}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {getBondName(investment.bondId)}
                          </Link>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(investment.amount)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDateTime(investment.investedOn)}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            Active
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
