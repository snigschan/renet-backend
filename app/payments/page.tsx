"use client"

import { useState } from "react"
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Eye,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Banknote,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Mock payment data
const paymentStats = {
  totalEarnings: 145000,
  pendingPayments: 25000,
  escrowBalance: 15000,
  monthlyGrowth: 18.5,
}

const recentTransactions = [
  {
    id: 1,
    type: "milestone",
    mission: "Luxury Villa Sales - Palm Jumeirah",
    client: "Emaar Properties",
    amount: 12500,
    status: "completed",
    date: "2024-01-15",
    method: "Bank Transfer",
  },
  {
    id: 2,
    type: "bonus",
    mission: "Property Management - Business Bay",
    client: "Dubai Properties",
    amount: 5000,
    status: "completed",
    date: "2024-01-12",
    method: "Digital Wallet",
  },
  {
    id: 3,
    type: "milestone",
    mission: "Market Research - DIFC",
    client: "Sobha Realty",
    amount: 8000,
    status: "pending",
    date: "2024-01-18",
    method: "Bank Transfer",
  },
  {
    id: 4,
    type: "escrow",
    mission: "Valuation Services - Marina",
    client: "Damac Properties",
    amount: 15000,
    status: "in-escrow",
    date: "2024-01-10",
    method: "Escrow Account",
  },
]

const activeContracts = [
  {
    id: 1,
    title: "Luxury Villa Sales Campaign",
    client: "Emaar Properties",
    totalValue: 25000,
    paidAmount: 20000,
    escrowAmount: 5000,
    progress: 80,
    nextMilestone: "Final Sales Report",
    nextPayment: 5000,
    dueDate: "2024-02-15",
  },
  {
    id: 2,
    title: "Property Management Services",
    client: "Dubai Properties",
    totalValue: 18000,
    paidAmount: 12000,
    escrowAmount: 6000,
    progress: 67,
    nextMilestone: "Monthly Operations Report",
    nextPayment: 6000,
    dueDate: "2024-02-01",
  },
]

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Payments & Earnings</h1>
          <p className="text-slate-600 text-lg">Secure payment management and financial overview</p>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Earnings</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {(paymentStats.totalEarnings / 1000).toFixed(0)}k AED
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{paymentStats.monthlyGrowth}% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Payments</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {(paymentStats.pendingPayments / 1000).toFixed(0)}k AED
                  </p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Calendar className="h-4 w-4 text-slate-500 mr-1" />
                <span className="text-sm text-slate-600">3 payments due</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Escrow Balance</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {(paymentStats.escrowBalance / 1000).toFixed(0)}k AED
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Shield className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Secured funds</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Payment Methods</p>
                  <p className="text-3xl font-bold text-slate-900">3</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">All verified</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="contracts">Active Contracts</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="h-5 w-5" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.slice(0, 4).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{transaction.mission}</p>
                            <p className="text-sm text-slate-600">{transaction.client}</p>
                            <p className="text-xs text-slate-500">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">{transaction.amount.toLocaleString()} AED</p>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : transaction.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Payment Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Escrow Protection</p>
                        <p className="text-sm text-green-700">All payments secured until milestone completion</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">Bank-Grade Security</p>
                        <p className="text-sm text-blue-700">256-bit SSL encryption for all transactions</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <FileText className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-900">Smart Contracts</p>
                        <p className="text-sm text-amber-700">Automated milestone-based payments</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                      <AlertCircle className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-900">Dispute Resolution</p>
                        <p className="text-sm text-purple-700">24/7 support for payment disputes</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{transaction.mission}</h3>
                          <p className="text-sm text-slate-600">{transaction.client}</p>
                          <p className="text-xs text-slate-500">
                            {transaction.date} • {transaction.method}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">{transaction.amount.toLocaleString()} AED</p>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : transaction.status === "pending"
                                  ? "secondary"
                                  : transaction.status === "in-escrow"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeContracts.map((contract) => (
                <Card key={contract.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{contract.title}</CardTitle>
                    <p className="text-slate-600">{contract.client}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Total Value</p>
                          <p className="font-semibold">{contract.totalValue.toLocaleString()} AED</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Paid</p>
                          <p className="font-semibold text-green-600">{contract.paidAmount.toLocaleString()} AED</p>
                        </div>
                        <div>
                          <p className="text-slate-500">In Escrow</p>
                          <p className="font-semibold text-blue-600">{contract.escrowAmount.toLocaleString()} AED</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{contract.progress}%</span>
                        </div>
                        <Progress value={contract.progress} className="h-2" />
                      </div>

                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-slate-700">Next Milestone</p>
                        <p className="text-sm text-slate-900">{contract.nextMilestone}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-slate-600">Due: {contract.dueDate}</span>
                          <span className="text-sm font-semibold text-slate-900">
                            {contract.nextPayment.toLocaleString()} AED
                          </span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full bg-transparent">
                        View Contract Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Banknote className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Emirates NBD Bank</p>
                        <p className="text-sm text-slate-600">Account ending in ****1234</p>
                      </div>
                    </div>
                    <Badge variant="default">Primary</Badge>
                  </div>

                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Digital Wallet</p>
                        <p className="text-sm text-slate-600">PayPal account</p>
                      </div>
                    </div>
                    <Badge variant="outline">Backup</Badge>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
