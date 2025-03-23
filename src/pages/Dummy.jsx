import React from "react";

const Dummy = () => {
  const resumeData = {
    personalInfo: {
      name: "Alex Johnson",
      title: "Senior Software Engineer",
      email: "alex@example.com",
      phone: "(555) 123-4567",
      github: "AlexJohnson",
      linkedin: "alex-johnson",
      location: "San Francisco, CA",
      summary:
        "Experienced software engineer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable and user-friendly applications that solve real-world problems.",
    },
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "AWS",
      "Docker",
      "GraphQL",
      "RESTful APIs",
      "CI/CD",
      "Agile Methodologies",
    ],
    experience: [
      {
        title: "Senior Frontend Engineer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        period: "Jan 2021 - Present",
        highlights: [
          "Led development of company's flagship React application, improving performance by 40%",
          "Implemented CI/CD pipeline reducing deployment time by 60%",
          "Mentored junior developers and conducted code reviews",
        ],
      },
      {
        title: "Software Engineer",
        company: "DataSystems LLC",
        location: "Portland, OR",
        period: "Mar 2018 - Dec 2020",
        highlights: [
          "Developed and maintained multiple Node.js microservices",
          "Created RESTful APIs consumed by web and mobile clients",
          "Reduced server costs by 30% through optimization efforts",
        ],
      },
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "University of California, Berkeley",
        period: "2016 - 2018",
      },
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Washington",
        period: "2012 - 2016",
      },
    ],
    projects: [
      {
        title: "LIBRARY MANAGEMENT SYSTEM:",
        description:
          "Developed a full-featured library management system using Node.js, Express.js, React, andMongoDB.",
      },
      {
        title: "COURSE ENROLLMENT APPLICATION PROJECT:",
        description:
          "I also built a Course Enrollment Application that streamlines the registration process for students",
      },
    ],
  };

  return (
    <div
      style={{ fontFamily: "Georgia, serif", padding: "40px", color: "#333" }}
    >
      <div>
        <h1
          style={{
            color: "black",
            fontWeight: 700,
            margin: 0,
            fontSize: "28px",
          }}
        >
          {resumeData.personalInfo.name}
        </h1>
        <h2 style={{ color: "#3b82f6", margin: "0 0", fontSize: "16px" }}>
          ({resumeData.personalInfo.title})
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            color: "#4b5563",
            fontSize: "14px",
          }}
        >
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6H2ZM20 8L12 13L4 8V6L12 11L20 6V8Z"></path>
            </svg>
            <p>{resumeData.personalInfo.email}</p>
          </div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79C7.06 12.19 7.99 13.45 9.32 14.68C10.55 16.01 11.81 16.94 13.21 17.38C14.34 17.73 15.03 17.62 15.88 17.08L17.37 16.14C17.76 15.89 18.26 15.98 18.57 16.34L21.15 19.41C21.41 19.72 21.38 20.18 21.06 20.42C19.96 21.3 18.09 22 15.86 22C14.43 22 12.88 21.73 11.28 21.19C9.68 20.66 8.16 19.87 6.75 18.81C5.34 17.75 4.06 16.5 2.91 15.07C1.77 13.64 1 12.11 0.58 10.49C0.15 8.86 0 7.3 0 5.79C0 3.56 0.7 1.69 1.58 0.58C1.82 0.27 2.27 0.24 2.59 0.5L5.66 3.08C6.02 3.39 6.11 3.89 5.86 4.28L4.92 5.77C4.38 6.62 4.27 7.31 4.62 8.44C5.06 9.84 5.99 11.1 6.62 10.79Z"></path>
            </svg>
            <p>{resumeData.personalInfo.phone}</p>
          </div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.59 9.52 21.31 9.52 21.07C9.52 20.85 9.51 20.26 9.51 19.54C7 20.03 6.34 18.61 6.34 18.61C5.92 17.63 5.32 17.37 5.32 17.37C4.55 16.84 5.38 16.85 5.38 16.85C6.24 16.91 6.68 17.74 6.68 17.74C7.45 19.11 8.79 18.72 9.27 18.49C9.34 17.91 9.58 17.5 9.84 17.28C7.18 17.02 4.37 15.98 4.37 11.38C4.37 10.09 4.84 9.05 5.62 8.24C5.5 8.02 5.08 6.82 5.74 5.35C5.74 5.35 6.7 5.06 9.5 6.72C10.4 6.48 11.35 6.36 12.3 6.36C13.25 6.36 14.2 6.48 15.1 6.72C17.9 5.06 18.86 5.35 18.86 5.35C19.52 6.82 19.1 8.02 18.98 8.24C19.76 9.05 20.23 10.09 20.23 11.38C20.23 15.99 17.41 17.02 14.74 17.28C15.11 17.57 15.44 18.16 15.44 19.07C15.44 20.39 15.42 21.41 15.42 21.78C15.42 22.02 15.59 22.3 16.09 22.21C20.06 20.88 23 17.13 23 12C23 6.48 18.52 2 12 2Z"></path>
            </svg>
            <p>{resumeData.personalInfo.github}</p>
          </div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5C1.9 5.5 1 4.6 1 3.5C1 2.4 1.9 1.5 3 1.5C4.1 1.5 4.98 2.4 4.98 3.5ZM4.98 8V22H1V8H4.98ZM8 8H11.77V9.85H11.82C12.33 8.93 13.55 7.86 15.37 7.86C19 7.86 19.5 10.32 19.5 13.32V22H15.5V14C15.5 12.47 15.47 10.61 13.6 10.61C11.7 10.61 11.4 12.13 11.4 13.9V22H8V8Z"></path>
            </svg>
            <p>{resumeData.personalInfo.linkedin}</p>
          </div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 13.25 10.45 20.3 11.12 21.17C11.53 21.69 12.47 21.69 12.88 21.17C13.55 20.3 19 13.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"></path>
            </svg>
            <p>{resumeData.personalInfo.location}</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "5px" }}>
        <h3
          style={{
            color: "#000000",
            borderBottom: "1px solid #000000",
            paddingBottom: "2px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Summary
        </h3>
        <p style={{ fontSize: "14px" }}>{resumeData.personalInfo.summary}</p>
      </div>
      <div style={{ marginBottom: "5px" }}>
        <h3
          style={{
            color: "#000000",
            borderBottom: "1px solid #000000",
            paddingBottom: "5px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Work Experience
        </h3>
        {resumeData.experience.map((exp, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "17px", fontWeight: "600" }}>
                {exp.title}
              </h4>
              <div style={{ color: "#4b5563", fontSize: "14px" }}>
                {exp.period}
              </div>
            </div>
            <div
              style={{
                color: "#4b5563",
                fontSize: "12px",
              }}
            >
              {exp.company}, {exp.location}
            </div>
            <ul style={{ paddingLeft: "20px" }}>
              <h1 style={{ fontWeight: "800" }}>Responsibilities</h1>
              {exp.highlights.map((highlight, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: "3px",
                    listStyleType: "circle",
                    fontSize: "14px",
                  }}
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "5px" }}>
        <h3
          style={{
            color: "#000000",
            borderBottom: "1px solid #000000",
            paddingBottom: "5px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Education
        </h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}>
                {edu.degree}
              </h4>
              <div style={{ color: "#4b5563", fontSize: "14px" }}>
                {edu.period}
              </div>
            </div>
            <div style={{ color: "#4b5563", fontSize: "13px" }}>
              {edu.school}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: "5px" }}>
        <h3
          style={{
            color: "#000000",
            borderBottom: "1px solid #000000",
            paddingBottom: "5px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Skills
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              style={{
                fontSize: "13.5px",
              }}
            >
              {skill},
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "5px" }}>
        <h3
          style={{
            color: "#000000",
            borderBottom: "1px solid #000000",
            paddingBottom: "5px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Projects
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {resumeData.projects.map((pro, index) => (
            <span
              key={index}
              style={{
                fontSize: "13.5px",
              }}
            >
              {skill},
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dummy;
