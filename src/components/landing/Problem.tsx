"use client";


export function Problem() {
  const stats = [
    { value: "97%", label: "of visitors bounce without taking any action." },
    { value: "$0", label: "return on your expensive ad spend and SEO efforts." },
    { value: "3x", label: "increase in conversion rate with exit-intent." },
    { value: "2min", label: "to set up and start capturing lost revenue." }
  ];

  return (
    <section id="problem" className="py-24 md:py-32 bg-white text-black border-y border-black/5">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-start">
          
          <div className="max-w-md sticky top-32">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
              The silent killer of <br className="hidden md:block"/> SaaS growth.
            </h2>
            <p className="text-lg text-black/60 leading-relaxed">
              You spend thousands of dollars driving traffic to your website, but the harsh reality is that most people aren't ready to buy immediately. They leave, and you never see them again.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/5 border border-black/5 rounded-3xl overflow-hidden">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white p-10 flex flex-col justify-center aspect-square group hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="text-5xl lg:text-7xl font-bold tracking-tighter mb-4 text-black group-hover:scale-105 transition-transform origin-left">
                  {stat.value}
                </div>
                <p className="text-sm text-black/60 font-medium leading-relaxed max-w-[180px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
