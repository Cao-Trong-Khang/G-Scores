function App() {
  const upcomingFeatures = [
    {
      title: 'Score lookup',
      description: 'Search candidate scores by registration number.',
    },
    {
      title: 'Score reports',
      description: 'Review subject statistics across four score levels.',
    },
    {
      title: 'Group A ranking',
      description: 'Highlight the top 10 students by math, physics, and chemistry.',
    },
  ]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              G-Scores
            </p>
            <h1 className="text-2xl font-semibold">Exam score dashboard</h1>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {upcomingFeatures.map((feature) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={feature.title}
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
