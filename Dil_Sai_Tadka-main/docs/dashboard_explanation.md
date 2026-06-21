# Dil Sai Tadka — Developer Dashboard Operational Reference

This guide details the structural layout, charts, Recharts details, and key actions in the **Dil Sai Tadka Developer Analytics & AI Dashboard**.

---

## 📈 1. Tab 1: Developer Analytics & Logs Console

This tab acts as an executive command center modeled after Stripe and Vercel dashboards.

### A. Core Metrics & KPI Cards
- **Total API Calls**: Aggregates all incoming requests across Zomato, Swiggy, and Airbnb gateways.
- **Successful Requests**: Total count of transactions returning `2xx` HTTP status codes.
- **Failed Requests**: Count of requests encountering bad formatting, authorization errors (`401`), or rate limits (`429`).
- **Average Latency**: Tracks average request processing times, identifying processing bottlenecks.
- **Partner Systems**: Count of active developer integrations registered inside the platform.

### B. Interactive Analytics Charts (Recharts)
1. **Traffic timeline (AreaChart)**: Smooth, gradient-filled Area Chart displaying overall calls, successful hits, and failed transactions over daily buckets.
2. **Top Endpoint Traffic (Donut/PieChart)**: Pie chart displaying split of gateway usage (e.g. `/api/partner/menu` vs `/api/partner/orders`), showcasing what APIs are highly demanded.
3. **Partner Traffic Volume (BarChart)**: Comparative Bar chart showing transaction counts of different aggregator networks side-by-side.

### C. Live Trace logs Table
Exposes a raw transaction console tracking:
- Precise time stamps of incoming requests.
- Partner name tags.
- Gateway endpoint paths.
- HTTP Request methods (`GET`, `POST`, `PUT`, `PATCH`).
- HTTP response codes.
- Real-time latencies (in milliseconds).
- Detailed error messages for immediate troubleshooting.

### D. Partner API Keys Generator
Allows platform admins to register new external integrations on the fly.
1. Input partner client name (e.g. `UberEats Aggregator`).
2. Click "Generate Partner API Key".
3. Displays a cryptographically secure, unique API key accompanied by a "Copy to Clipboard" button.

---

## 🧠 2. Tab 2: AI Review Summary & Insights Panel

Displays the generative outputs of the **Groq Llama 3 Review summarizer engine**.

### A. Satisfaction Radial Gauge
- Projects an aesthetic radial gauge showing guest satisfaction percentages (e.g. `92%`).
- Renders an interactive needle representing general positive, neutral, and negative sentiment balances.

### B. Operational Strengths & Complaints
- **Key Strengths**: Actionable bullets listing guest favorites (e.g. pool hospitality, delicious paneer).
- **Active Complaints**: Actionable lists mapping guest friction points (e.g. peak-hour wait times).

### C. Operations Solutions
- Renders pre-tuned AI operations advice to resolve complaints and boost brand loyalty.

---

## 🧑‍🍳 3. Tab 3: Culinary AI Chatbot Assistant

An interactive chat portal designed to provide premium culinary recommendation advice using **Groq Chat completions**.

- **Menu Context Binding**: Integrates all active menu items from PostgreSQL directly into prompt templates.
- **Custom queries**: Allows typing dynamic criteria (e.g., family dining recommendations, spicy favorites).
- **Smooth visual chat logs**: Renders standard user vs assistant dialog boxes with premium typing states.
