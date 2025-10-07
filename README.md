# 💰 SavvyGoals — Saving Goals & Budget Tracker

SavvyGoals is a modern web app that helps users **set, track, and achieve their saving goals** while maintaining a simple **budget management system**. It’s designed to make personal finance easier, visual, and motivating — all in one dashboard.

---

## 🚀 Features

- 🎯 **Saving Goals Tracker** – Create, edit, and track progress toward financial goals (e.g., emergency fund, vacation, new car).  
- 📊 **Budget Management** – Categorize income and expenses, visualize spending patterns, and stay on track.  
- 🔐 **User Authentication** – Secure sign-in and session management powered by [Clerk](https://clerk.com/).  
- 💾 **Real-time Data** – All financial data is stored and updated instantly using [Supabase](https://supabase.com/).  
- 📱 **Responsive UI** – Built with modern React components and Tailwind styling for a sleek, mobile-friendly interface.  

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Framework** | [Next.js 14](https://nextjs.org/) |
| **Database** | [Supabase](https://supabase.com/) |
| **Auth** | [Clerk](https://clerk.com/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Charts & Visualization** | [Recharts](https://recharts.org/) |
| **Deployment** | [AWS](https://aws.com/) |

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/savvygoals.git
   cd savvygoals
2. Install dependencies
   ```bash
   npm install
3. Set up environment variables
   Create a .env.local file in the project root and include the following:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
    CLERK_SECRET_KEY=your_clerk_secret
4. Run the app locally
   ```bash
   npm run dev
5. Visit http://localhost:3000 to start using the app.

# Example Use Cases
* Track savings for multiple goals (e.g., emergency fund, car, trip).
* Log expenses to stay within monthly budgets.
* Visualize spending trends and progress with charts.
* View remaining goal amounts and adjust your plan as income or expenses change.

# Screenshots
  ### Coming Soon

# Project Structure
    ├── app/
    │   ├── dashboard/
    │   ├── goals/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── charts/
    │   ├── ui/
    │   └── forms/
    ├── lib/
    │   ├── supabase.ts
    │   └── clerk.ts
    ├── public/
    ├── styles/
    └── package.json

# Contributing
Contributions are welcome!
Feel free to submit issues, suggestions, or pull requests.
1. Fork the repo
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
4. Push to the branch:
   ```bash
    git push origin feature/your-feature
5. Open a Pull Request

# Future Enhancements
🧾 Expense breakdown by category <br>
🔔 Goal completion reminders <br>
📈 Insights dashboard with savings projections <br>
🌐 Multi-currency support

# License
This project is licensed under the MIT License.

# Author
Brandon Tjandra <br>
📧 btjandra15@gmail.com <br>
🌐 https://btjandra.com




