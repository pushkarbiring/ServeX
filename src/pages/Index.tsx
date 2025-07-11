import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Globe, 
  Smartphone, 
  Wrench, 
  Code, 
  Bot, 
  Database, 
  Server, 
  Layers, 
  ArchiveIcon 
} from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  
  const features = [
    { 
      icon: <Globe className="h-10 w-10 text-blue-500" />, 
      title: 'Web Development', 
      description: 'Professional websites, web applications, and e-commerce platforms.',
      path: '/services?category=web'
    },
    { 
      icon: <Smartphone className="h-10 w-10 text-green-500" />, 
      title: 'App Development', 
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      path: '/services?category=app'
    },
    { 
      icon: <Wrench className="h-10 w-10 text-orange-500" />, 
      title: 'App Testing', 
      description: 'Comprehensive testing services before app publication.',
      path: '/services?category=testing'
    },
    { 
      icon: <Code className="h-10 w-10 text-purple-500" />, 
      title: 'Reverse Engineering Tools', 
      description: 'Software tools for reverse engineering and analysis.',
      path: '/services?category=reverseengineering'
    },
    { 
      icon: <Bot className="h-10 w-10 text-pink-500" />, 
      title: 'AI Tools', 
      description: 'Machine learning and AI-powered tools and services.',
      path: '/services?category=ai'
    },
    { 
      icon: <Database className="h-10 w-10 text-indigo-500" />, 
      title: 'Scraper API', 
      description: 'Data scraping and extraction APIs for various platforms.',
      path: '/services?category=scraper'
    },
    { 
      icon: <Server className="h-10 w-10 text-red-500" />, 
      title: 'Background App Services', 
      description: 'Backend services and background processing solutions.',
      path: '/services?category=background'
    },
    { 
      icon: <Layers className="h-10 w-10 text-yellow-500" />, 
      title: "Other App's APIs", 
      description: 'Integration with third-party APIs and services.',
      path: '/services?category=api'
    },
    { 
      icon: <ArchiveIcon className="h-10 w-10 text-cyan-500" />, 
      title: 'App Repository', 
      description: 'Access to our extensive repository of applications and tools.',
      path: '/services?category=repository'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
            Advanced Tech Services for Your 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Digital Success</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            From web development to AI tools, we provide comprehensive tech solutions with a transparent 50% upfront payment model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => navigate('/services')}>
              Browse Services
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of professional tech services designed to meet all your digital needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(feature.path)}>
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm">Learn more</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Model Section */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">How Our Payment Works</h2>
              <p className="text-muted-foreground">
                We believe in transparent and fair payment practices. Our 50% upfront payment model ensures commitment from both sides.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-medium">Initial Consultation</h3>
                    <p className="text-sm text-muted-foreground">Discuss your requirements and get a detailed quote.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-medium">50% Upfront Payment</h3>
                    <p className="text-sm text-muted-foreground">Pay half of the agreed amount to kick-start your project.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-medium">Development & Updates</h3>
                    <p className="text-sm text-muted-foreground">We work on your project and provide regular progress updates.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-medium">Final Payment & Delivery</h3>
                    <p className="text-sm text-muted-foreground">Once you're satisfied, complete the remaining payment to receive the finished product.</p>
                  </div>
                </div>
              </div>
              
              <Button onClick={() => navigate('/services')}>Get Started</Button>
            </div>
            
            <div className="relative h-[400px] bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center">
              <div className="absolute inset-4 bg-card rounded-md shadow-lg flex items-center justify-center">
                <div className="text-center p-6 space-y-4">
                  <h3 className="text-xl font-bold">Secure Payment Process</h3>
                  <p className="text-muted-foreground">We support multiple secure payment methods for your convenience.</p>
                  <div className="flex justify-center gap-4">
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Ready to Transform Your Digital Presence?</h2>
              <p className="text-primary-foreground/80">
                Join our satisfied clients and experience the ServeX difference. Our team of experts is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="secondary" size="lg" onClick={() => navigate('/services')}>
                  Explore Services
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate('/contact')}>
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}