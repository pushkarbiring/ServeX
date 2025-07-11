import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, CreditCard, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Checkout() {
  const { items, removeItem, clearCart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [paymentTab, setPaymentTab] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - Navigate to confirmation page
      clearCart();
      navigate('/payment-success');
    } catch (err) {
      setError('Payment processing failed. Please try again or use another payment method.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-16 max-w-3xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Your Cart is Empty</CardTitle>
            <CardDescription>You haven't added any services to your cart yet.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <Button onClick={() => navigate('/services')}>Browse Services</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Review your selected services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%]">Service</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.service.id}>
                      <TableCell>
                        <div className="font-medium">{item.service.title}</div>
                        <div className="text-sm text-muted-foreground">{item.service.category}</div>
                      </TableCell>
                      <TableCell className="text-right">${item.service.price.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeItem(item.service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">${totalPrice.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>50% Upfront Payment</TableCell>
                    <TableCell className="text-right font-bold">${(totalPrice * 0.5).toLocaleString()}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>* The remaining 50% will be due upon project completion</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Options */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="credit-card" value={paymentTab} onValueChange={setPaymentTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                
                <TabsContent value="credit-card">
                  <form onSubmit={handlePayment} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        name="cardName"
                        placeholder="John Doe" 
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456" 
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input 
                          id="cardExpiry" 
                          name="cardExpiry"
                          placeholder="MM/YY" 
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input 
                          id="cardCvc" 
                          name="cardCvc"
                          placeholder="123" 
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    {error && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Pay ${(totalPrice * 0.5).toLocaleString()} Now
                        </span>
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="paypal">
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-center py-8">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold">
                        PayPal
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Continue with PayPal"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary Sidebar */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Services ({items.length})</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Today's Payment (50%)</span>
                <span>${(totalPrice * 0.5).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Remaining Payment</span>
                <span>${(totalPrice * 0.5).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                <p>* The remaining payment will be due upon successful completion and delivery of all services.</p>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button 
                className="w-full" 
                disabled={isProcessing}
                onClick={handlePayment}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : (
                  `Pay $${(totalPrice * 0.5).toLocaleString()} Now`
                )}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => navigate('/services')}
              >
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}