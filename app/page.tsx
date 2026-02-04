import React from 'react'
import MainNavbar from '@/components/core/MainNavbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SignInDialog from '@/components/auth/sign-in-dialog'
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react'
import Container from '@/components/core/Container'

const features = [
  {
    icon: Target,
    title: 'Set Clear Goals',
    description: 'Define your habits and track your progress with clear, measurable objectives.'
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your daily habits and see your improvement over time with detailed analytics.'
  },
  {
    icon: Calendar,
    title: 'Daily Reminders',
    description: 'Never miss a habit with smart reminders and notifications tailored to your schedule.'
  },
  {
    icon: BarChart3,
    title: 'Visual Analytics',
    description: 'Understand your patterns with beautiful charts and insights into your habit journey.'
  },
  {
    icon: CheckCircle2,
    title: 'Streak Tracking',
    description: 'Build momentum with streak counters that motivate you to maintain consistency.'
  },
  {
    icon: Sparkles,
    title: 'Achievement System',
    description: 'Unlock achievements and celebrate milestones as you build better habits.'
  }
]

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar/>
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4 sm:py-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Build Better Habits, One Day at a Time</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Transform Your Life with
              <span className="block mt-2 bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Consistent Habits
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Track your daily habits, build lasting routines, and achieve your goals with our intuitive habit tracking platform. 
              Start your journey to a better you today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <SignInDialog triggerLabel="Get Started Free" />
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Privacy First</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Everything You Need to Build Better Habits
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to help you stay consistent and achieve your goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="border-border/50 hover:border-border transition-colors">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-3xl sm:text-4xl font-bold">
                  Ready to Start Your Journey?
                </CardTitle>
                <CardDescription className="text-lg">
                  Join thousands of users building better habits every day. 
                  It only takes a minute to get started.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SignInDialog triggerLabel="Start Tracking Today" />
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default page