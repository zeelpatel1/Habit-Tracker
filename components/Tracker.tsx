import React from "react"

const ActiveChallenge = [
  {
    title: "Detox with apple",
    category: "Health",
    days: 7,
    color: "green",
  },
  {
    title: "Read 10 Pages a Day",
    category: "Learn",
    days: 14,
    color: "yellow",
  },
  {
    title: "No Sugar for 5 days",
    category: "Health",
    days: 5,
    color: "pink",
  },
  {
    title: "Breath Exercise",
    category: "Health",
    days: 42,
    color: "pink",
  },
  {
    title: "Yoga Exercise",
    category: "Health",
    days: 42,
    color: "pink",
  },
]

const colorMap: Record<string, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  pink: "bg-pink-500",
}

const Tracker = () => {
  return (
    <div>
      <p className="text-lg font-medium text-foreground">
        You've completed 4/6 habits today
      </p>

      <div className="mt-5 bg-card border border-border p-4 mb-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-foreground">
          Active Challenges
        </h2>

        <div className="flex flex-wrap gap-3">
          {ActiveChallenge.map((item) => (
            <div
              key={item.title}
              className="bg-accent inline-flex items-center gap-4 p-3 rounded-lg"
            >
              {/* Logo */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  colorMap[item.color] ?? "bg-muted"
                }`}
              >
                <span className="text-white font-bold text-lg">
                  {item.title[0]}
                </span>
              </div>

              {/* Info */}
              <div>
                <p className="font-semibold text-foreground">
                  {item.title}
                </p>
                <div className="flex gap-4 text-muted-foreground mt-1 text-sm">
                  <span>{item.days} days</span>
                  <span>{item.category} Challenge</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tracker
