import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProtectedRoute from '@/components/ProtectedRoute';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-2025-001',
    date: '2025-07-01',
    services: [
      { id: '1', name: 'Basic Website Development', price: 999 }
    ],
    status: 'in-progress',
    paymentStatus: 'partial',
    totalAmount: 999,
    paidAmount: 499.5
  },
  {
    id: 'ORD-2025-002',
    date: '2025-06-15',
    services: [
      { id: '6', name: 'Basic App Testing', price: 799 },
      { id: '10', name: 'Basic Web Scraper', price: 999 }
    ],
    status: 'completed',
    paymentStatus: 'paid',
    totalAmount: 1798,
    paidAmount: 1798
  },
  {
    id: 'ORD-2025-003',
    date: '2025-05-22',
    services: [
      { id: '3', name: 'Mobile App Development (iOS)', price: 3999 }
    ],
    status: 'completed',
    paymentStatus: 'paid',
    totalAmount: 3999,
    paidAmount: 3999
  }
];

// Mock projects data
const mockProjects = [
  {
    id: 'PRJ-2025-001',
    name: 'Corporate Website',
    startDate: '2025-07-01',
    expectedEndDate: '2025-08-15',
    progress: 35,
    status: 'in-progress'
  },
  {
    id: 'PRJ-2025-002',
    name: 'E-commerce Web Scraper',
    startDate: '2025-06-15',
    expectedEndDate: '2025-06-30',
    progress: 100,
    status: 'completed'
  },
  {
    id: 'PRJ-2025-003',
    name: 'iOS Fitness App',
    startDate: '2025-05-22',
    expectedEndDate: '2025-07-10',
    progress: 100,
    status: 'completed'
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
    'in-progress': { variant: 'secondary', label: 'In Progress' },
    'completed': { variant: 'default', label: 'Completed' },
    'cancelled': { variant: 'destructive', label: 'Cancelled' },
    'pending': { variant: 'outline', label: 'Pending' },
    'partial': { variant: 'outline', label: 'Partial' },
    'paid': { variant: 'default', label: 'Paid' }
  };
  
  const { variant, label } = variants[status] || { variant: 'outline', label: status };
  
  return <Badge variant={variant}>{label}</Badge>;
};

// Progress bar component
const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ProtectedRoute>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle>Welcome back, {user?.displayName || 'User'}!</CardTitle>
                <CardDescription>
                  Here's a summary of your orders and projects with ServeX.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <p className="text-2xl font-bold">{mockOrders.length}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <p className="text-2xl font-bold">{mockProjects.filter(p => p.status === 'in-progress').length}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <p className="text-2xl font-bold">{mockProjects.filter(p => p.status === 'completed').length}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <p className="text-2xl font-bold">${mockOrders.reduce((sum, order) => sum + order.paidAmount, 0).toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest orders and project updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b">
                      <div>
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                        <div className="flex items-center mt-2 gap-2">
                          <StatusBadge status={order.status} />
                          <StatusBadge status={order.paymentStatus} />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Paid: ${order.paidAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setActiveTab('orders')}>View All Orders</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>
                  Track all your orders and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Services</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <ul className="list-disc list-inside">
                            {order.services.map(service => (
                              <li key={service.id} className="text-sm">{service.name}</li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell>${order.totalAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <StatusBadge status={order.paymentStatus} />
                            <p className="text-xs text-muted-foreground">
                              ${order.paidAmount.toLocaleString()} of ${order.totalAmount.toLocaleString()}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
                <CardDescription>
                  Track the progress of your ongoing and completed projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {mockProjects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>Project ID: {project.id}</CardDescription>
                          </div>
                          <StatusBadge status={project.status} />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Start Date:</span> {project.startDate}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expected Completion:</span> {project.expectedEndDate}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span>{project.progress}%</span>
                          </div>
                          <ProgressBar progress={project.progress} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}