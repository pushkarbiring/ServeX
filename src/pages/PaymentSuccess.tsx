import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-lg py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Thank you for your payment. Your order has been successfully processed.
          </p>
          <p>
            We've sent you a confirmation email with all the details. Our team will contact you shortly to begin work on your project.
          </p>
          <div className="bg-muted p-4 rounded-md my-4">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ol className="text-left text-sm space-y-2">
              <li>1. Our team will review your order details</li>
              <li>2. You'll receive a project timeline within 24 hours</li>
              <li>3. Development will begin according to the timeline</li>
              <li>4. You'll receive regular updates on your dashboard</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={() => navigate('/dashboard')} className="w-full">
            Go to Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate('/')} className="w-full">
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}