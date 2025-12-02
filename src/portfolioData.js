import { 
  Brain, 
  Terminal, 
  Layout, 
  Server 
} from 'lucide-react';

export const portfolioData = {
  personalInfo: {
    name: "Vrajeshkumar Bhatt",
    role: "Machine Learning Engineer & Data Analyst",
    tagline: "Transforming raw data into actionable intelligence through AI and scalable software solutions.",
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
    description: "I am a skilled Machine Learning Software Engineer and Data Analyst with over 3 years of experience in building scalable software products and ML systems. My expertise bridges the gap between complex data algorithms and user-friendly applications. I specialize in Python, SQL, and cloud technologies, focusing on robust ML pipelines, NLP, and predictive analytics. Whether it's optimizing backend architectures or deriving business insights through interactive dashboards, I am passionate about leveraging cutting-edge technologies to solve real-world problems."
  },

  skills: [
    {
      category: "Machine Learning & AI",
      icon: "Brain",
      items: ["NLP", "TensorFlow", "Keras", "Scikit-learn", "Computer Vision", "Predictive Analytics", "Transformers", "Vertex AI"]
    },
    {
      category: "Data Analysis & Visualization",
      icon: "Layout",
      items: ["Power BI", "Tableau", "Pandas", "NumPy", "SQL", "ETL Pipelines", "Excel", "Matplotlib"]
    },
    {
      category: "Backend & Development",
      icon: "Server",
      items: ["Python", "Flask", "Django", "RESTful APIs", "Microservices", "C/C++", "JavaScript"]
    },
    {
      category: "Tools & Cloud",
      icon: "Terminal",
      items: ["GCP", "Azure", "Docker", "Kubernetes", "Git/GitHub", "Jira", "Jupyter"]
    }
  ],

  experience: [
    {
      id: 1,
      role: "Assistant Department Manager",
      company: "No Frills",
      location: "Toronto, ON",
      period: "Aug 2024 - Present",
      description: [
        "Manage inventory records and optimize stock levels to ensure smooth department operations.",
        "Address inquiries, resolve issues, and collaborate with team members to maintain efficiency.",
        "Demonstrate strong operational management and leadership in a fast-paced retail environment."
      ]
    },
    {
      id: 2,
      role: "Financial Data Analyst",
      company: "Moah Appliances and Services",
      location: "Toronto, ON",
      period: "Apr 2023 - June 2024",
      description: [
        "Created automated reporting solutions using Excel and Python, reducing manual work by 65%.",
        "Gathered business requirements from finance partners and validated data mappings.",
        "Documented business rules for financial reporting systems to ensure data accuracy."
      ]
    },
    {
      id: 3,
      role: "Data Analyst (Co-op)",
      company: "Toronto Business College",
      location: "Toronto, ON",
      period: "Sept 2023 - Dec 2023",
      description: [
        "Designed and deployed 15+ interactive Power BI dashboards utilizing star schema models.",
        "Developed advanced DAX expressions for complex calculations and data transformations.",
        "Presented analytical findings to managerial audiences, enhancing data literacy across teams."
      ]
    },
    {
      id: 4,
      role: "Python Backend Engineer",
      company: "Getactvy Physio",
      location: "Bengaluru, India",
      period: "May 2021 - Mar 2023",
      description: [
        "Implemented RESTful services using Python and Flask to seamlessly integrate ML models.",
        "Collaborated with Data Scientists to build, deploy, and refine models for scalability.",
        "Conducted detailed code reviews and optimized system performance for user engagement."
      ]
    },
    {
      id: 5,
      role: "Machine Learning Intern",
      company: "Gatisofttech",
      location: "Surat, India",
      period: "Dec 2020 - Apr 2021",
      description: [
        "Developed an Automated Ticket Management System using neural network models (25% time reduction).",
        "Implemented end-to-end cloud deployment ensuring adherence to statistics-driven insights.",
        "Applied advanced analytics to understand customer behaviors and drive profitability."
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Fraud Email Detection",
      category: "NLP & Security",
      description: "A supervised machine learning system utilizing Python, Scikit-learn, and TF-IDF to detect fraudulent emails. Enhanced with a fine-tuned BERT Large Language Model to analyze context and flag phishing attempts with high accuracy.",
      techStack: ["Python", "BERT", "NLP", "Scikit-learn"],
      links: {
        demo: "#", 
        repo: "[https://github.com/vrajeshbhatt](https://github.com/vrajeshbhatt)"
      }
    },
    {
      id: 2,
      title: "Job Title Prediction",
      category: "Machine Learning",
      description: "A recommendation system achieving 85% accuracy in predicting optimal job titles based on user profiles. Implemented ranking models and ETL processes to extract insights from extensive databases.",
      techStack: ["ML", "ETL", "Python", "Data Pipelines"],
      links: {
        demo: "#",
        repo: "[https://github.com/vrajeshbhatt](https://github.com/vrajeshbhatt)"
      }
    },
    {
      id: 3,
      title: "Automated Ticket System",
      category: "AI & Cloud",
      description: "An intelligent ticket management solution using neural networks to predict ticket categories and priorities. Deployed on cloud platforms using Flask for the backend API and Hugging Face for model accessibility.",
      techStack: ["Neural Networks", "Flask", "Cloud", "Hugging Face"],
      links: {
        demo: "#",
        repo: "[https://github.com/vrajeshbhatt](https://github.com/vrajeshbhatt)"
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
        repo: "[https://github.com/vrajeshbhatt](https://github.com/vrajeshbhatt)"
      }
    }
  ]
};
