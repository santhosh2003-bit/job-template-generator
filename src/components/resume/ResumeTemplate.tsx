import React from "react";
import { ResumeData } from "@/context/ResumeContext";

interface ResumeTemplateProps {
  data: ResumeData;
  template: string;
}

export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({
  data,
  template,
}) => {
  switch (template) {
    case "template2":
      return <ModernTemplate data={data} />;
    case "template3":
      return <AcademicTemplate data={data} />;
    case "template1":
    default:
      return <ProfessionalTemplate data={data} />;
  }
};

const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: "'Calibri', sans-serif",
        color: "#000000",
        width: "555px",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        fontSize: "10px",
        lineHeight: "1.2",
        height: "802px",
        overflow: "hidden",
      }}
    >
      <header style={{ marginBottom: "8px" }}>
        <h1
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "2px" }}
        >
          {data.personalInfo.name}
        </h1>
        <h2 style={{ fontSize: "11px", color: "#555555", marginBottom: "4px" }}>
          {data.personalInfo.title}
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            fontSize: "8px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minHeight: "14px",
            }}
          >
            <b>Email:</b>
            <span style={{ wordBreak: "break-all" }}>
              {data.personalInfo.email}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minHeight: "14px",
            }}
          >
            <b>Phone:</b>
            <span>{data.personalInfo.phone}</span>
          </div>
          {data.personalInfo.github && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                minHeight: "14px",
              }}
            >
              <b>Github:</b>
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                minHeight: "14px",
              }}
            >
              <b>LinkedIn:</b>
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minHeight: "14px",
            }}
          >
            <b>Location:</b>
            <span>{data.personalInfo.location}</span>
          </div>
        </div>
      </header>

      <section style={{ marginBottom: "5px" }}>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            paddingBottom: "2px",
            borderBottom: "1px solid #000000",
            position: "relative",
            zIndex: 1,
          }}
        >
          Summary
        </h3>
        <p style={{ fontSize: "9px", textAlign: "justify" }}>
          {data.personalInfo.summary}
        </p>
      </section>

      <section style={{ marginBottom: "5px" }}>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            paddingBottom: "2px",
            borderBottom: "1px solid #000000",
            position: "relative",
            zIndex: 1,
          }}
        >
          Work Experience
        </h3>
        {data.experience.map((exp, index) => (
          <div key={index} style={{ marginBottom: "4px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "2px",
              }}
            >
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  maxWidth: "70%",
                }}
              >
                {exp.title}
              </h4>
              {exp.period && (
                <span
                  style={{
                    fontSize: "8px",
                    color: "#555555",
                    textAlign: "right",
                    flexShrink: 0,
                    maxWidth: "30%",
                  }}
                >
                  {exp.period}
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: "9px",
                color: "#555555",
                marginBottom: "2px",
              }}
            >
              {exp.company}
              {exp.location ? `, ${exp.location}` : ""}
            </div>
            <ul
              style={{
                paddingLeft: "14px",
                margin: "0",
                listStyleType: "disc",
                fontSize: "9px",
              }}
            >
              {exp.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      marginRight: "5px",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    •
                  </span>
                  <span style={{ textAlign: "justify", flex: 1 }}>
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "5px" }}>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            paddingBottom: "2px",
            borderBottom: "1px solid #000000",
            position: "relative",
            zIndex: 1,
          }}
        >
          Education
        </h3>
        {data.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: "4px" }}>
            <div style={{ fontSize: "11px", fontWeight: "600" }}>
              {edu.degree}
            </div>
            <div style={{ fontSize: "9px", color: "#555555" }}>
              {edu.school}
              {edu.period ? `, ${edu.period}` : ""}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            paddingBottom: "2px",
            borderBottom: "1px solid #000000",
            position: "relative",
            zIndex: 1,
          }}
        >
          Skills
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            fontSize: "9px",
          }}
        >
          {data.skills.map((skill, index) => (
            <span key={index}>
              {skill}
              {index < data.skills.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        color: "#333333",
        width: "555px",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        fontSize: "10px",
        lineHeight: "1.2",
        height: "802px",
        overflow: "hidden",
      }}
    >
      <header style={{ marginBottom: "10px", borderLeft: "4px solid #6E59A5", paddingLeft: "10px" }}>
        <h1
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "2px", color: "#6E59A5" }}
        >
          {data.personalInfo.name}
        </h1>
        <h2 style={{ fontSize: "11px", color: "#555555", marginBottom: "6px" }}>
          {data.personalInfo.title}
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            fontSize: "8px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minHeight: "14px",
            }}
          >
            <b>Email:</b>
            <span style={{ wordBreak: "break-all" }}>
              {data.personalInfo.email}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minHeight: "14px",
            }}
          >
            <b>Phone:</b>
            <span>{data.personalInfo.phone}</span>
          </div>
          {data.personalInfo.github && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                minHeight: "14px",
              }}
            >
              <b>Github:</b>
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                minHeight: "14px",
              }}
            >
              <b>LinkedIn:</b>
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minHeight: "14px",
            }}
          >
            <b>Location:</b>
            <span>{data.personalInfo.location}</span>
          </div>
        </div>
      </header>

      <section style={{ marginBottom: "8px" }}>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            paddingBottom: "2px",
            borderBottom: "1px solid #6E59A5",
            color: "#6E59A5",
            position: "relative",
            zIndex: 1,
          }}
        >
          Summary
        </h3>
        <p style={{ fontSize: "9px", textAlign: "justify" }}>
          {data.personalInfo.summary}
        </p>
      </section>

      <section style={{ marginBottom: "8px" }}>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            paddingBottom: "2px",
            borderBottom: "1px solid #6E59A5",
            color: "#6E59A5",
            position: "relative",
            zIndex: 1,
          }}
        >
          Work Experience
        </h3>
        {data.experience.map((exp, index) => (
          <div key={index} style={{ marginBottom: "6px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "2px",
              }}
            >
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  maxWidth: "70%",
                  color: "#333333",
                }}
              >
                {exp.title}
              </h4>
              {exp.period && (
                <span
                  style={{
                    fontSize: "8px",
                    color: "#555555",
                    textAlign: "right",
                    flexShrink: 0,
                    maxWidth: "30%",
                  }}
                >
                  {exp.period}
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: "9px",
                color: "#555555",
                marginBottom: "3px",
                fontStyle: "italic",
              }}
            >
              {exp.company}
              {exp.location ? `, ${exp.location}` : ""}
            </div>
            <ul
              style={{
                paddingLeft: "14px",
                margin: "0",
                listStyleType: "disc",
                fontSize: "9px",
              }}
            >
              {exp.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      marginRight: "5px",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    •
                  </span>
                  <span style={{ textAlign: "justify", flex: 1 }}>
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "8px" }}>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            paddingBottom: "2px",
            borderBottom: "1px solid #6E59A5",
            color: "#6E59A5",
            position: "relative",
            zIndex: 1,
          }}
        >
          Education
        </h3>
        {data.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: "4px" }}>
            <div style={{ fontSize: "11px", fontWeight: "600", color: "#333333" }}>
              {edu.degree}
            </div>
            <div style={{ fontSize: "9px", color: "#555555", fontStyle: "italic" }}>
              {edu.school}
              {edu.period ? `, ${edu.period}` : ""}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "5px",
            paddingBottom: "2px",
            borderBottom: "1px solid #6E59A5",
            color: "#6E59A5",
            position: "relative",
            zIndex: 1,
          }}
        >
          Skills
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            fontSize: "9px",
          }}
        >
          {data.skills.map((skill, index) => (
            <span 
              key={index} 
              style={{
                background: "#F1F0FB", 
                padding: "2px 6px", 
                borderRadius: "4px",
                color: "#333333"
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

const AcademicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: "'Times New Roman', serif",
        color: "#222222",
        width: "555px",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        fontSize: "10px",
        lineHeight: "1.2",
        height: "802px",
        overflow: "hidden",
      }}
    >
      <header style={{ marginBottom: "10px", textAlign: "center" }}>
        <h1
          style={{ fontSize: "19px", fontWeight: "bold", marginBottom: "4px" }}
        >
          {data.personalInfo.name}
        </h1>
        <h2 style={{ fontSize: "11px", color: "#555555", marginBottom: "4px" }}>
          {data.personalInfo.title}
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "8px",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minHeight: "14px",
            }}
          >
            <span style={{ wordBreak: "break-all" }}>
              {data.personalInfo.email}
            </span>
          </div>
          <span>|</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minHeight: "14px",
            }}
          >
            <span>{data.personalInfo.phone}</span>
          </div>
          {data.personalInfo.github && (
            <>
              <span>|</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  minHeight: "14px",
                }}
              >
                <span>{data.personalInfo.github}</span>
              </div>
            </>
          )}
          {data.personalInfo.linkedin && (
            <>
              <span>|</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  minHeight: "14px",
                }}
              >
                <span>{data.personalInfo.linkedin}</span>
              </div>
            </>
          )}
          <span>|</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              minHeight: "14px",
            }}
          >
            <span>{data.personalInfo.location}</span>
          </div>
        </div>
      </header>

      <hr style={{
        border: "none",
        height: "1px",
        backgroundColor: "#000000",
        margin: "0 0 10px 0"
      }} />

      <section style={{ marginBottom: "8px" }}>
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "5px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          Summary
        </h3>
        <p style={{ fontSize: "9px", textAlign: "justify" }}>
          {data.personalInfo.summary}
        </p>
      </section>

      <section style={{ marginBottom: "8px" }}>
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "5px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          Experience
        </h3>
        {data.experience.map((exp, index) => (
          <div key={index} style={{ marginBottom: "6px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "2px",
              }}
            >
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  maxWidth: "70%",
                }}
              >
                {exp.title}
              </h4>
              {exp.period && (
                <span
                  style={{
                    fontSize: "8px",
                    color: "#555555",
                    textAlign: "right",
                    flexShrink: 0,
                    maxWidth: "30%",
                  }}
                >
                  {exp.period}
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: "9px",
                color: "#555555",
                marginBottom: "3px",
                fontWeight: "600",
              }}
            >
              {exp.company}
              {exp.location ? `, ${exp.location}` : ""}
            </div>
            <ul
              style={{
                paddingLeft: "14px",
                margin: "0",
                listStyleType: "disc",
                fontSize: "9px",
              }}
            >
              {exp.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "1px",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      marginRight: "5px",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    •
                  </span>
                  <span style={{ textAlign: "justify", flex: 1 }}>
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "8px" }}>
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "5px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          Education
        </h3>
        {data.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <div style={{ fontSize: "11px", fontWeight: "600" }}>
              {edu.degree}
            </div>
            <div style={{ fontSize: "9px", color: "#555555", fontWeight: "600" }}>
              {edu.school}
              {edu.period ? `, ${edu.period}` : ""}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "5px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          Skills
        </h3>
        <div
          style={{
            fontSize: "9px",
            textAlign: "center"
          }}
        >
          {data.skills.map((skill, index) => (
            <span key={index}>
              {skill}
              {index < data.skills.length - 1 ? " • " : ""}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumeTemplate;
