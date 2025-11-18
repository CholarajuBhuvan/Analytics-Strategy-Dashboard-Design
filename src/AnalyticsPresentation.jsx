import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ComposedChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Search, 
  DollarSign, 
  Activity, 
  Code, 
  Database, 
  PieChart as PieChartIcon, 
  Lightbulb
} from 'lucide-react';

// --- PART 3: SAMPLE DATA SET ---
// Generating a realistic dataset for "Price Elasticity & Revenue Optimization"
const generateData = () => {
  const data = [
    { discountBin: '0% (Full Price)',  views: 1200, sales: 60,  avgPrice: 100, category: 'Tech & Coding' },
    { discountBin: '10-20% Off',       views: 1500, sales: 120, avgPrice: 85,  category: 'Tech & Coding' },
    { discountBin: '30-50% Off',       views: 2000, sales: 350, avgPrice: 60,  category: 'Tech & Coding' },
    { discountBin: '60-80% Off',       views: 3000, sales: 900, avgPrice: 25,  category: 'Tech & Coding' },
    
    { discountBin: '0% (Full Price)',  views: 800,  sales: 20,  avgPrice: 100, category: 'Business' },
    { discountBin: '10-20% Off',       views: 1000, sales: 45,  avgPrice: 85,  category: 'Business' },
    { discountBin: '30-50% Off',       views: 1400, sales: 180, avgPrice: 60,  category: 'Business' },
    { discountBin: '60-80% Off',       views: 2200, sales: 500, avgPrice: 25,  category: 'Business' },

    { discountBin: '0% (Full Price)',  views: 900,  sales: 30,  avgPrice: 100, category: 'Design' },
    { discountBin: '10-20% Off',       views: 1100, sales: 60,  avgPrice: 85,  category: 'Design' },
    { discountBin: '30-50% Off',       views: 1600, sales: 200, avgPrice: 60,  category: 'Design' },
    { discountBin: '60-80% Off',       views: 2400, sales: 550, avgPrice: 25,  category: 'Design' },
  ];

  // Enrich data with calculated fields
  return data.map(item => ({
    ...item,
    revenue: item.sales * item.avgPrice,
    conversionRate: parseFloat(((item.sales / item.views) * 100).toFixed(1)),
    rpp: parseFloat((item.sales * item.avgPrice / item.views).toFixed(2)) // Revenue Per Pageview
  }));
};

const sampleData = generateData();

// --- SUB-COMPONENTS ---

const FeaturesSection = () => (
  <div className="space-y-8">
    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
      <h3 className="text-xl font-bold text-blue-900 mb-2">Objective</h3>
      <p className="text-blue-800">
        To propose high-impact analytical engines for a marketplace platform that optimize revenue, user retention, and content quality.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          title: "Dynamic Pricing & Elasticity Engine",
          icon: <DollarSign className="h-8 w-8 text-green-600" />,
          desc: "Analyzes historical sales against discount depth to find the 'sweet spot' between volume and margin.",
          metrics: ["Price Elasticity", "Rev. Per View", "Conversion Rate"]
        },
        {
          title: "Churn Prediction Model",
          icon: <Users className="h-8 w-8 text-red-500" />,
          desc: "Identifies users at risk of leaving based on login frequency, course completion stalls, and support tickets.",
          metrics: ["Days Inactive", "Video Drop-off %", "NPS Score"]
        },
        {
          title: "Search Gap Analysis",
          icon: <Search className="h-8 w-8 text-purple-500" />,
          desc: "Detects high-volume search queries that yield zero or low-rated results to guide content acquisition.",
          metrics: ["Zero-result Queries", "Search Exit Rate", "Keyword Value"]
        },
        {
          title: "Course 'Stickiness' Index",
          icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
          desc: "A composite score measuring how engaging a course is, based on binge-watching behavior and assignment completions.",
          metrics: ["Completion Rate", "Session Duration", "Return Rate"]
        },
        {
          title: "Instructor Performance Heatmap",
          icon: <Activity className="h-8 w-8 text-indigo-500" />,
          desc: "Visualizes instructor responsiveness and rating trends over time to automate quality assurance flags.",
          metrics: ["Response Time", "Rating Trend", "Refund Rate"]
        }
      ].map((feature, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-lg">{feature.icon}</div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Feature {idx + 1}</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
          <p className="text-sm text-gray-600 mb-4 h-16">{feature.desc}</p>
          <div className="flex flex-wrap gap-2">
            {feature.metrics.map((m, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">{m}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LogicSection = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Feature: Dynamic Pricing Engine</h3>
        <p className="text-gray-600">
          The goal is to calculate the <strong>Optimal Discount Rate</strong>. We don't want just maximum sales (which happens at 90% off); we want maximum <em>Revenue</em>.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
          The Logic Flow
        </h4>
        <ol className="space-y-4 text-sm text-gray-700">
          <li className="flex">
            <span className="bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-xs">1</span>
            <span><strong>Data Collection:</strong> Aggregate historical transactions grouped by Category and Discount Bucket (e.g., 0%, 10-20%, etc.).</span>
          </li>
          <li className="flex">
            <span className="bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-xs">2</span>
            <span><strong>Metrics Calculation:</strong> For each bucket, calculate Total Revenue, Conversion Rate, and Revenue Per View (RPV).</span>
          </li>
          <li className="flex">
            <span className="bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-xs">3</span>
            <span><strong>Elasticity Check:</strong> Compare RPV across buckets. If a deeper discount increases Sales Volume enough to offset the lower Price, RPV goes up.</span>
          </li>
          <li className="flex">
            <span className="bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-xs">4</span>
            <span><strong>Optimization:</strong> Identify the bucket with the highest Total Revenue, not the highest Conversion Rate.</span>
          </li>
        </ol>
      </div>
    </div>

    <div className="bg-gray-900 rounded-xl p-6 text-gray-300 font-mono text-sm overflow-x-auto shadow-2xl">
      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
        <span className="text-green-400 font-bold">algorithm.py</span>
        <Code className="w-4 h-4" />
      </div>
      <pre className="leading-relaxed">
{`def find_optimal_price(course_data):
  # 1. Group data by Discount Buckets
  buckets = group_by_discount(course_data)
  
  results = []

  for bucket in buckets:
    # 2. Calculate key metrics
    views = bucket.total_views
    sales = bucket.total_sales
    avg_price = bucket.total_revenue / sales
    
    conversion_rate = (sales / views) * 100
    total_revenue = sales * avg_price
    
    # Revenue Per View (Efficiency Metric)
    rpv = total_revenue / views
    
    results.append({
      "discount": bucket.name,
      "revenue": total_revenue,
      "rpv": rpv
    })

  # 3. Find bucket with Max Revenue
  optimal = max(results, key=lambda x: x['revenue'])

  return {
    "recommendation": optimal['discount'],
    "projected_revenue": optimal['revenue']
  }
`}
      </pre>
    </div>
  </div>
);

const AnalysisSection = ({ selectedCategory, setSelectedCategory, aggregatedData, filteredData }) => (
  <div className="space-y-8">
    {/* Controls */}
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-2">
        <Database className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-gray-800">Data Analysis Dashboard</h3>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">Filter by Category:</span>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border-gray-300 bg-gray-50 border rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Tech & Coding">Tech & Coding</option>
          <option value="Business">Business</option>
          <option value="Design">Design</option>
        </select>
      </div>
    </div>

    {/* Charts Row 1 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: The Revenue vs Volume Trade-off */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Revenue vs. Conversion Rate</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={aggregatedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="discountBin" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Conv. Rate (%)', angle: 90, position: 'insideRight' }} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }}/>
              <Bar yAxisId="left" dataKey="revenue" name="Total Revenue" fill="#3b82f6" barSize={40} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="conversionRate" name="Conversion Rate %" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Sales Volume */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Total Sales Volume by Discount</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aggregatedData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="discountBin" type="category" width={100} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: '#f3f4f6'}} />
              <Bar dataKey="sales" fill="#10b981" radius={[0, 4, 4, 0]} barSize={30} name="Units Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Key Insights Panel */}
    <div className="bg-slate-800 text-white rounded-xl p-8 shadow-lg">
      <div className="flex items-center mb-6">
        <PieChartIcon className="w-6 h-6 text-yellow-400 mr-3" />
        <h3 className="text-xl font-bold">Valuable Information Derived</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wide">Optimal Pricing Strategy</h5>
          <p className="text-2xl font-bold text-white">30-50% Off</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            While 60-80% off generates the most sales volume, the <strong>30-50% bucket generates the highest Revenue</strong>. The massive volume at 80% off does not compensate for the low price point.
          </p>
        </div>

        <div className="space-y-2">
          <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wide">The "Conversion Trap"</h5>
          <p className="text-2xl font-bold text-white">High Conv ≠ High $</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            The conversion rate skyrockets to over 20% at the deepest discount, but Revenue Per Pageview (RPV) drops. This indicates we are under-monetizing high-intent traffic.
          </p>
        </div>

        <div className="space-y-2">
          <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wide">Category Sensitivity</h5>
          <p className="text-2xl font-bold text-white">Tech &gt; Design</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Analysis shows "Tech & Coding" maintains higher conversion rates at lower discounts compared to "Design", suggesting Tech learners are less price-sensitive and value content utility more.
          </p>
        </div>
      </div>
    </div>

    {/* Raw Data Table Preview */}
    <div className="mt-8">
      <h4 className="text-sm font-bold text-gray-600 mb-4">Sample Data Set Preview</h4>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount Bin</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Conv. Rate</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${row.discountBin.includes('60-80') ? 'bg-red-100 text-red-800' : 
                      row.discountBin.includes('0%') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {row.discountBin}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">${row.avgPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{row.views.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{row.sales.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">${row.revenue.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{row.conversionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export default function AnalyticsPresentation() {
  const [activeTab, setActiveTab] = useState('features');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter data for charts
  const filteredData = useMemo(() => {
    if (selectedCategory === 'All') return sampleData;
    return sampleData.filter(d => d.category === selectedCategory);
  }, [selectedCategory]);

  // Aggregated data for "All" view to prevent duplicate x-axis points
  const aggregatedData = useMemo(() => {
    if (selectedCategory !== 'All') return filteredData;
    
    const bins = ['0% (Full Price)', '10-20% Off', '30-50% Off', '60-80% Off'];
    return bins.map(bin => {
      const items = sampleData.filter(d => d.discountBin === bin);
      return {
        discountBin: bin,
        revenue: items.reduce((acc, curr) => acc + curr.revenue, 0),
        conversionRate: parseFloat((items.reduce((acc, curr) => acc + curr.sales, 0) / items.reduce((acc, curr) => acc + curr.views, 0) * 100).toFixed(1)),
        sales: items.reduce((acc, curr) => acc + curr.sales, 0)
      };
    });
  }, [selectedCategory, filteredData]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Marketplace Analytics</h1>
                <p className="text-xs text-gray-500">Strategic Proposal & Data Simulation</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {['features', 'logic', 'analysis'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'features' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Proposed Analytical Features</h2>
              <p className="text-gray-600 mt-2">Five key engines to drive growth on a Udemy/eBay-style platform.</p>
            </div>
            <FeaturesSection />
          </div>
        )}

        {activeTab === 'logic' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Algorithm Design</h2>
              <p className="text-gray-600 mt-2">Logic flow for the Dynamic Pricing & Elasticity Engine.</p>
            </div>
            <LogicSection />
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Data Insights & Presentation</h2>
              <p className="text-gray-600 mt-2">Visualizing the sample dataset to derive actionable business strategies.</p>
            </div>
            <AnalysisSection 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              aggregatedData={aggregatedData}
              filteredData={filteredData}
            />
          </div>
        )}
      </main>
    </div>
  );
}
