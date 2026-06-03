import { 
  Brain, 
  Terminal, 
  Layout, 
  Server 
} from 'lucide-react';

export const portfolioData = {
  personalInfo: {
    name: "Vrajesh Bhatt",
    role: "AI Engineer",
    tagline: "Architecting and deploying production-grade LLM applications, agentic workflows, and real-time voice automation systems.",
    location: "Toronto, ON, Canada",
    email: "vrajesh.bhatt@outlook.com",
    availability: "Open to Relocate",
    image: "profile.jpg",
    heroImage: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?auto=format&fit=crop&q=80&w=2070",
    social: {
      linkedin: "https://linkedin.com/in/vrajeshbhatt/",
      github: "https://github.com/vrajeshbhatt",
      huggingface: "https://huggingface.co/vrajeshbhatt", 
      email: "mailto:vrajesh.bhatt@outlook.com"
    }
  },
  
  about: {
    title: "About Me",
    description: "I am an AI Engineer with 2+ years of experience architecting and deploying production-grade LLM applications, agentic workflows, and real-time voice automation systems. I specialize in stateful multi-agent pipelines, RAG systems, and constrained tool-calling architectures that bridge unstructured conversational data with rigid enterprise POS and CRM business logic. With a strong track record as a technical liaison between product teams and enterprise clients, I translate complex business requirements into high-reliability AI solutions. I thrive in fast-paced, client-facing environments that demand a bias for action, iterative delivery, and measurable outcomes."
  },

  skills: [
    {
      category: "AI & Agentic Systems",
      icon: "Brain",
      items: ["LangGraph", "CrewAI", "Agentic Workflows", "Prompt Engineering", "RAG Systems", "Tool-Calling Architectures", "JSON Schema / Zod", "Vector Databases", "BERT", "TensorFlow", "Keras"]
    },
    {
      category: "Voice AI & Conversational",
      icon: "Layout",
      items: ["Retell AI", "Vapi", "Real-Time State Management", "Multi-Turn Dialogue Design", "Live Voice Infrastructure", "Voice-to-POS Integration", "Structured Output Schemas", "Webhook Integration"]
    },
    {
      category: "Engineering & Cloud",
      icon: "Server",
      items: ["Python", "TypeScript", "Node.js", "Express.js", "Next.js 16", "Flask", "RESTful APIs", "Docker", "Vercel", "Render", "AWS (EC2, S3)", "GCP", "n8n Orchestration"]
    },
    {
      category: "Data & Infrastructure",
      icon: "Terminal",
      items: ["PostgreSQL", "Advanced SQL", "Pandas", "NumPy", "Scikit-learn", "Power BI", "NoSQL", "ETL Pipelines", "Relational Modeling"]
    }
  ],

  experience: [
    {
      id: 1,
      role: "AI Automation Engineer — Forward-Deployed",
      company: "Genie AI",
      location: "Remote",
      period: "Jan 2026 - Present",
      description: [
        "Serve as the primary technical liaison between product teams and enterprise client-side SMEs, scoping objectives and deploying custom AI-driven feature enhancements.",
        "Design and deploy proprietary automation software using Python, Selenium, and modular data architectures, translating complex workflows into scalable code.",
        "Integrate LLMs and generative AI capabilities into live automation pipelines, engineering robust error-handling and decision logic.",
        "Drive fast prototyping cycles to build and validate proof-of-concept iterations, accelerating time-to-production."
      ]
    },
    {
      id: 2,
      role: "AI Developer - Systems & Agentic Engineering",
      company: "SmartReview",
      location: "Remote",
      period: "Dec 2025 - Present",
      description: [
        "Architect and ship production-ready AI agents handling complex customer queries, reservations, and order management by bridging natural language with POS/CRM systems.",
        "Design constrained tool-calling architectures using JSON schemas and enums, eliminating LLM hallucinations and ensuring 100% data integrity.",
        "Engineer direct pipeline connections to enterprise interfaces, translating unstructured conversational streams into deterministic payloads."
      ]
    },
    {
      id: 3,
      role: "Financial Data Analyst & Systems Engineer",
      company: "Moah Appliance and Services Inc.",
      location: "Toronto, ON",
      period: "Apr 2023 - Jun 2024",
      description: [
        "Built relational analytical environments processing 100K+ transaction records using SQL and Python pipelines to automate audit trails and surface operational inefficiencies.",
        "Reduced manual data transformation workloads by 65% through Python (Pandas/NumPy) tooling and structured ETL optimization; recognized as Employee of the Quarter.",
        "Designed, deployed, and maintained interactive Power BI dashboards that converted high-volume operational records into structured performance metrics.",
        "Authored comprehensive technical documentation establishing clear data pipeline logic and audit trails for both technical and non-technical stakeholders."
      ]
    },
    {
      id: 4,
      role: "Data Analyst (Co-op)",
      company: "Toronto Business College",
      location: "Toronto, ON",
      period: "Sep 2023 - Dec 2023",
      description: [
        "Engineered and launched 15+ SQL and Power BI dashboards to monitor student acquisition metrics; automated cross-platform ETL workflows in Python, cutting manual report turnaround by 50%.",
        "Partnered with business units to define technical requirements and translate systemic data constraints into actionable dashboard logic.",
        "Presented analytical findings to managerial audiences, enhancing data literacy across teams."
      ]
    },
    {
      id: 5,
      role: "Python Backend Engineer",
      company: "Getactyv Physio",
      location: "Bengaluru, India",
      period: "May 2021 - Mar 2022",
      description: [
        "Engineered scalable RESTful APIs using Python and Flask to operationalize ML models in real-time production environments, with SQL query optimization under peak concurrent load.",
        "Optimized SQL query performance and backend processing pipelines, significantly reducing latency under peak concurrent transaction loads."
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Voice AI Agent",
      category: "Voice AI & Conversational",
      description: "Architected an asynchronous middleware proxy normalizing erratic voice-conversational payloads into validated schemas aligned with third-party POS API endpoints (Square, Toast, Clover). Optimized hot-path latency via an Anti-Corruption Layer (ACL) and deterministic webhook router; implemented multi-tenant RLS policies and OAuth token-refresh workers ensuring 100% uptime.",
      techStack: ["TypeScript", "Next.js 16", "Supabase", "Retell AI", "Zod", "Webhooks", "Vercel", "Render"],
      links: {
        demo: "#",
        repo: "https://github.com/vrajeshbhatt"
      }
    },
    {
      id: 2,
      title: "Automated Ticket Triage & CI/CD Deployment Pipeline",
      category: "AI & Cloud",
      description: "Built and trained an NLP text classification model using TensorFlow and Keras to predict incoming support ticket categories and priorities, optimizing operational triage workflows. Designed Python and Pandas ETL pipelines to clean unstructured text data, extract feature weights, and vectorize text using embedding techniques. Containerized production inference models with Docker and built a fully automated CI/CD deployment pipeline via GitHub Actions to AWS EC2.",
      techStack: ["Python", "TensorFlow", "Docker", "GitHub Actions", "Flask", "AWS EC2", "Pandas", "ETL"],
      links: {
        demo: "#",
        repo: "https://github.com/vrajeshbhatt"
      }
    },
    {
      id: 3,
      title: "LangGraph Multi-Agent Orchestration System",
      category: "AI Agents (In Dev)",
      description: "Building stateful multi-agent pipelines using LangGraph and CrewAI to coordinate specialized AI sub-agents with persistent memory, dynamic task routing, and conditional branching logic. Integrating RAG-based retrieval and tool-use capabilities to enable agents to autonomously resolve complex, multi-step enterprise queries using live vector knowledge bases.",
      techStack: ["LangGraph", "CrewAI", "RAG", "OpenAI API", "Supabase Vector"],
      links: {
        demo: "#",
        repo: "https://github.com/vrajeshbhatt"
      }
    },
    {
      id: 4,
      title: "Sales Data Dashboard",
      category: "Business Intelligence",
      description: "A comprehensive Power BI dashboard analyzing sales data to uncover trends and KPIs. Incorporates forecasting capabilities to visualize future trends and derive actionable business strategies.",
      techStack: ["Power BI", "SQL", "DAX", "Data Viz"],
      links: {
        demo: "#",
        repo: "https://github.com/vrajeshbhatt"
      }
    }
  ]
};
