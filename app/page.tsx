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
import Link from 'next/link'

type Feature = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const FEATURES: Feature[] = [
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

function TrustPills() {
  const items = [
    'Free Forever',
    'No Credit Card',
    'Privacy First',
  ] as const

  return (
    <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
      {items.map((label) => (
        <div key={label} className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon

  return (
    <Card className="group border-border/50 hover:border-border transition-colors">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-primary/10 group-hover:ring-primary/20 transition">
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
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 left-1/2 h-128 w-lg -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-112 w-md rounded-full bg-muted blur-3xl" />
      </div>

      <Container>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border text-sm font-medium">
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
            Track your daily habits, build lasting routines, and achieve your goals with an experience that stays simple while you stay consistent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <SignInDialog triggerLabel="Get Started Free" />
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="#features">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <TrustPills />
        </div>
      </Container>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <Container>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything You Need to Build Better Habits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you stay consistent and achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="py-20">
      <Container>
        <div className="max-w-3xl mx-auto px-4">
          <Card className="relative overflow-hidden border-2 border-primary/20 bg-linear-to-br from-card to-card/50">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <CardHeader className="relative text-center space-y-4 pb-8">
              <CardTitle className="text-3xl sm:text-4xl font-bold">
                Ready to Start Your Journey?
              </CardTitle>
              <CardDescription className="text-lg">
                Join thousands of users building better habits every day. It only takes a minute to get started.
              </CardDescription>
            </CardHeader>

            <CardContent className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignInDialog triggerLabel="Start Tracking Today" />
              <Button asChild variant="outline" size="lg">
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
    </div>
  )
}