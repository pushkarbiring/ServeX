import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart, Service } from '@/contexts/CartContext';

// Mock data for services
const mockServices: Service[] = [
  {
    id: '1',
    title: 'Basic Website Development',
    description: 'Responsive website development with up to 5 pages and basic SEO.',
    price: 999,
    category: 'web',
    image: '/assets/services/web-basic.jpg'
  },
  {
    id: '2',
    title: 'E-commerce Website',
    description: 'Full-featured online store with payment processing and product management.',
    price: 2499,
    category: 'web',
    image: '/assets/services/web-ecommerce.jpg'
  },
  {
    id: '3',
    title: 'Mobile App Development (iOS)',
    description: 'Native iOS app development with custom UI and core features.',
    price: 3999,
    category: 'app',
    image: '/assets/services/app-ios.jpg'
  },
  {
    id: '4',
    title: 'Mobile App Development (Android)',
    description: 'Native Android app development with custom UI and core features.',
    price: 3999,
    category: 'app',
    image: '/assets/services/app-android.jpg'
  },
  {
    id: '5',
    title: 'Cross-Platform App Development',
    description: 'React Native or Flutter app development for both iOS and Android.',
    price: 4999,
    category: 'app',
    image: '/assets/services/app-cross.jpg'
  },
  {
    id: '6',
    title: 'Basic App Testing',
    description: 'Functional testing, UI testing, and bug fixes for mobile apps.',
    price: 799,
    category: 'testing',
    image: '/assets/services/testing-basic.jpg'
  },
  {
    id: '7',
    title: 'Comprehensive App Testing',
    description: 'In-depth testing including performance, security, and usability testing.',
    price: 1499,
    category: 'testing',
    image: '/assets/services/testing-comprehensive.jpg'
  },
  {
    id: '8',
    title: 'Basic AI Integration',
    description: 'Integrate pre-built AI models into your application or website.',
    price: 1999,
    category: 'ai',
    image: '/assets/services/ai-basic.jpg'
  },
  {
    id: '9',
    title: 'Custom AI Solution',
    description: 'Custom AI model development and integration for specific business needs.',
    price: 4999,
    category: 'ai',
    image: '/assets/services/ai-custom.jpg'
  },
  {
    id: '10',
    title: 'Basic Web Scraper',
    description: 'Data extraction tool for single website with structured output.',
    price: 999,
    category: 'scraper',
    image: '/assets/services/scraper-basic.jpg'
  },
  {
    id: '11',
    title: 'Advanced Web Scraper',
    description: 'Multi-site data extraction with API access and regular updates.',
    price: 2499,
    category: 'scraper',
    image: '/assets/services/scraper-advanced.jpg'
  },
  {
    id: '12',
    title: 'API Integration Service',
    description: 'Connect your application with third-party APIs and services.',
    price: 1499,
    category: 'api',
    image: '/assets/services/api-integration.jpg'
  }
];

// Categories
const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'web', name: 'Web Development' },
  { id: 'app', name: 'App Development' },
  { id: 'testing', name: 'App Testing' },
  { id: 'ai', name: 'AI Tools' },
  { id: 'scraper', name: 'Scraper API' },
  { id: 'background', name: 'Background Services' },
  { id: 'api', name: "Other App's APIs" },
  { id: 'repository', name: 'App Repository' },
  { id: 'reverseengineering', name: 'Reverse Engineering Tools' }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>(mockServices);
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem, isInCart, removeItem } = useCart();

  // Handle query params for category filtering
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setActiveTab(categoryParam);
    } else {
      setActiveTab('all');
    }
  }, [location.search]);

  // Filter services based on active tab and search query
  useEffect(() => {
    let filtered = mockServices;
    
    // Filter by category
    if (activeTab !== 'all') {
      filtered = filtered.filter(service => service.category === activeTab);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(query) || 
        service.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredServices(filtered);
  }, [activeTab, searchQuery]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(value === 'all' ? '/services' : `/services?category=${value}`, { replace: true });
  };

  // Handle cart actions
  const handleCartAction = (service: Service) => {
    if (isInCart(service.id)) {
      removeItem(service.id);
    } else {
      addItem(service);
    }
  };

  return (
    <div className="container py-12">
      <div className="space-y-4 text-center mb-10">
        <h1 className="text-3xl font-bold">Our Services</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our comprehensive range of tech services designed to meet your digital needs
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <Input
            type="search"
            placeholder="Search services..."
            className="max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="w-full md:w-auto overflow-x-auto">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full md:w-auto flex overflow-x-auto">
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden flex flex-col">
                <div className="h-48 bg-muted/50 flex items-center justify-center">
                  <div className="text-4xl text-muted-foreground">
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <Badge>{service.category}</Badge>
                  </div>
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-2xl font-bold">${service.price.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">50% upfront payment</div>
                </CardContent>
                <CardFooter className="border-t bg-muted/40 p-4">
                  <Button 
                    className="w-full" 
                    variant={isInCart(service.id) ? "secondary" : "default"}
                    onClick={() => handleCartAction(service)}
                  >
                    {isInCart(service.id) ? "Remove from Cart" : "Add to Cart"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium">No services found</h3>
              <p className="text-muted-foreground mt-2">Try changing your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}