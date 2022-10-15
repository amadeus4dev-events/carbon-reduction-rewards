const Individual = () => (
  <div className="container px-8 py-4">
    <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
      Your Statistics
    </h1>

    <div className="mt-8 stats shadow-lg">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">
          Emitted CO<sub>2</sub>
        </div>
        <div className="stat-value text-primary">2500.6 kg</div>
        <div className="stat-desc">21% less than your peers</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-cyan-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Trips</div>
        <div className="stat-value text-cyan-500">2.6M</div>
        <div className="stat-desc">14% more than your peers</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-purple-500">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src="https://placeimg.com/128/128/people" />
            </div>
          </div>
        </div>

        <div className="stat-title">Sustainability Score</div>
        <div className="stat-value text-purple-500">74/100</div>
        <div className="stat-desc">12% better than your peers</div>
      </div>
    </div>
  </div>
);

export default Individual;
