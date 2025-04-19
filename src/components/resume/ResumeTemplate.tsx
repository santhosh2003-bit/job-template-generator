
import React from 'react';
import { ResumeData } from '@/context/ResumeContext';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

interface ResumeTemplateProps {
  data: ResumeData;
  template: string;
}

export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data, template }) => {
  switch (template) {
    case 'template1':
      return <ProfessionalTemplate data={data} />;
    case 'template2':
      return <CreativeTemplate data={data} />;
    case 'template3':
      return <AcademicTemplate data={data} />;
    default:
      return <ProfessionalTemplate data={data} />;
  }
};

const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="py-8 px-10 text-black" style={{
      fontFamily: "'Calibri', sans-serif",
      color: '#000000',
      paddingLeft: '50px',
      paddingRight: '50px'
    }}>
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {data.personalInfo.name}
        </h1>
        <h2 className="text-lg mt-1" style={{ fontSize: '16px', marginTop: '4px' }}>
          {data.personalInfo.title}
        </h2>
        <div className="flex flex-wrap gap-4 mt-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
          <div className="flex items-center gap-2 text-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <Mail size={16} />
            <span style={{ wordBreak: 'break-all' }}>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <Phone size={16} />
            <span>{data.personalInfo.phone}</span>
          </div>
          {data.personalInfo.github && (
            <div className="flex items-center gap-2 text-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
              <Github size={16} />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-2 text-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
              <Linkedin size={16} />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <MapPin size={16} />
            <span>{data.personalInfo.location}</span>
          </div>
        </div>
      </header>

      <section className="mb-6" style={{ marginBottom: '24px' }}>
        <h3 className="border-b-2 border-black pb-1 font-bold text-lg mb-2" style={{
          borderBottom: '2px solid black',
          paddingBottom: '4px',
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '8px'
        }}>
          Summary
        </h3>
        <p className="text-base pl-5" style={{ fontSize: '14px', paddingLeft: '20px' }}>
          {data.personalInfo.summary}
        </p>
      </section>

      <section className="mb-6" style={{ marginBottom: '24px' }}>
        <h3 className="border-b-2 border-black pb-1 font-bold text-lg mb-2" style={{
          borderBottom: '2px solid black',
          paddingBottom: '4px',
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '8px'
        }}>
          Work Experience
        </h3>
        {data.experience.map((exp, index) => (
          <div key={index} className="pl-5 mb-5" style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 className="font-semibold text-lg" style={{ fontWeight: '600', fontSize: '16px' }}>
                {exp.title}
              </h4>
              {exp.period && (
                <div className="text-sm font-medium" style={{ fontSize: '12px', fontWeight: '500' }}>
                  {exp.period}
                </div>
              )}
            </div>
            <div className="text-gray-600 text-sm font-medium mb-1" style={{
              color: '#666',
              fontSize: '12px',
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              {exp.company}
              {exp.location ? `, ${exp.location}` : ""}
            </div>
            <ul className="pl-8 list-disc space-y-2" style={{
              paddingLeft: '32px',
              listStyleType: 'disc',
              marginTop: '8px'
            }}>
              {exp.highlights.map((highlight, idx) => (
                <li key={idx} className="text-base" style={{ fontSize: '14px', marginBottom: '8px' }}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6" style={{ marginBottom: '24px' }}>
        <h3 className="border-b-2 border-black pb-1 font-bold text-lg mb-2" style={{
          borderBottom: '2px solid black',
          paddingBottom: '4px',
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '8px'
        }}>
          Education
        </h3>
        <div className="flex flex-col gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.education.map((edu, index) => (
            <div key={index} className="pl-5 mb-3" style={{ paddingLeft: '20px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 className="font-semibold text-lg" style={{ fontWeight: '600', fontSize: '16px' }}>
                  {edu.degree}
                </h4>
                {edu.period && (
                  <div className="text-gray-600 text-xs" style={{ color: '#666', fontSize: '12px' }}>
                    {edu.period}
                  </div>
                )}
              </div>
              {edu.school && (
                <div className="text-gray-600 text-base" style={{ color: '#666', fontSize: '14px' }}>
                  {edu.school}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="border-b-2 border-black pb-1 font-bold text-lg mb-2" style={{
          borderBottom: '2px solid black',
          paddingBottom: '4px',
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '8px'
        }}>
          Skills
        </h3>
        <div className="flex flex-wrap gap-3 pl-5" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          paddingLeft: '20px'
        }}>
          {data.skills.map((skill, index) => (
            <span key={index} className="text-base inline-block" style={{ fontSize: '14px', display: 'inline-block' }}>
              {skill}{index < data.skills.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="py-8 px-10 text-black" style={{
      fontFamily: "'Arial', sans-serif",
      color: '#000000',
      backgroundColor: '#ffffff',
      paddingLeft: '50px',
      paddingRight: '50px'
    }}>
      <header className="mb-6 border-l-4 border-purple-500 pl-4" style={{
        marginBottom: '24px',
        borderLeftWidth: '4px',
        borderLeftColor: '#8B5CF6',
        paddingLeft: '16px'
      }}>
        <h1 className="text-3xl font-bold text-purple-700" style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#7C3AED'
        }}>
          {data.personalInfo.name}
        </h1>
        <h2 className="text-xl text-purple-500 mt-1" style={{
          fontSize: '18px',
          color: '#8B5CF6',
          marginTop: '4px'
        }}>
          {data.personalInfo.title}
        </h2>
        
        <div className="flex flex-wrap gap-4 mt-4" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '16px'
        }}>
          <div className="flex items-center gap-2 text-sm" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px'
          }}>
            <Mail size={16} className="text-purple-500" style={{ color: '#8B5CF6' }} />
            <span style={{ wordBreak: 'break-all' }}>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px'
          }}>
            <Phone size={16} className="text-purple-500" style={{ color: '#8B5CF6' }} />
            <span>{data.personalInfo.phone}</span>
          </div>
          {data.personalInfo.github && (
            <div className="flex items-center gap-2 text-sm" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px'
            }}>
              <Github size={16} className="text-purple-500" style={{ color: '#8B5CF6' }} />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-2 text-sm" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px'
            }}>
              <Linkedin size={16} className="text-purple-500" style={{ color: '#8B5CF6' }} />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px'
          }}>
            <MapPin size={16} className="text-purple-500" style={{ color: '#8B5CF6' }} />
            <span>{data.personalInfo.location}</span>
          </div>
        </div>
      </header>

      <section className="mb-6" style={{ marginBottom: '24px' }}>
        <h3 className="text-lg font-bold mb-2 text-purple-700 flex items-center" style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#7C3AED',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="w-8 h-0.5 bg-purple-500 mr-2" style={{
            width: '32px',
            height: '2px',
            backgroundColor: '#8B5CF6',
            marginRight: '8px'
          }}></div>
          Summary
        </h3>
        <p className="text-base" style={{ fontSize: '14px', paddingLeft: '12px' }}>
          {data.personalInfo.summary}
        </p>
      </section>

      <section className="mb-6" style={{ marginBottom: '24px' }}>
        <h3 className="text-lg font-bold mb-3 text-purple-700 flex items-center" style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '12px',
          color: '#7C3AED',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="w-8 h-0.5 bg-purple-500 mr-2" style={{
            width: '32px',
            height: '2px',
            backgroundColor: '#8B5CF6',
            marginRight: '8px'
          }}></div>
          Work Experience
        </h3>
        
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4 pl-4 border-l-2 border-purple-200" style={{
            marginBottom: '16px',
            paddingLeft: '16px',
            borderLeftWidth: '2px',
            borderLeftColor: '#E9D5FF'
          }}>
            <div className="flex flex-col" style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 className="font-semibold text-lg text-purple-600" style={{
                fontWeight: '600',
                fontSize: '16px',
                color: '#9333EA'
              }}>
                {exp.title}
              </h4>
              <div className="font-medium" style={{ fontWeight: '500' }}>
                {exp.company}
                {exp.location ? ` • ${exp.location}` : ""}
              </div>
              {exp.period && (
                <div className="text-sm text-gray-600" style={{
                  fontSize: '12px',
                  color: '#666'
                }}>
                  {exp.period}
                </div>
              )}
            </div>
            
            <ul className="mt-2 pl-5 list-disc space-y-1" style={{
              marginTop: '8px',
              paddingLeft: '20px',
              listStyleType: 'disc'
            }}>
              {exp.highlights.map((highlight, idx) => (
                <li key={idx} className="text-sm" style={{ fontSize: '14px' }}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6" style={{ marginBottom: '24px' }}>
        <h3 className="text-lg font-bold mb-3 text-purple-700 flex items-center" style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '12px',
          color: '#7C3AED',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="w-8 h-0.5 bg-purple-500 mr-2" style={{
            width: '32px',
            height: '2px',
            backgroundColor: '#8B5CF6',
            marginRight: '8px'
          }}></div>
          Education
        </h3>
        
        <div className="pl-4 border-l-2 border-purple-200" style={{
          paddingLeft: '16px',
          borderLeftWidth: '2px',
          borderLeftColor: '#E9D5FF'
        }}>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3" style={{ marginBottom: '12px' }}>
              <h4 className="font-semibold text-purple-600" style={{
                fontWeight: '600',
                color: '#9333EA'
              }}>
                {edu.degree}
              </h4>
              {edu.school && (
                <div className="text-sm" style={{ fontSize: '14px' }}>
                  {edu.school}
                </div>
              )}
              {edu.period && (
                <div className="text-sm text-gray-600" style={{
                  fontSize: '12px',
                  color: '#666'
                }}>
                  {edu.period}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-3 text-purple-700 flex items-center" style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '12px',
          color: '#7C3AED',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="w-8 h-0.5 bg-purple-500 mr-2" style={{
            width: '32px',
            height: '2px',
            backgroundColor: '#8B5CF6',
            marginRight: '8px'
          }}></div>
          Skills
        </h3>
        
        <div className="flex flex-wrap gap-2 pl-4" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          paddingLeft: '16px'
        }}>
          {data.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm" style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '4px',
              paddingBottom: '4px',
              backgroundColor: '#F3E8FF',
              color: '#7C3AED',
              borderRadius: '9999px',
              fontSize: '13px'
            }}>
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
    <div className="py-8 px-10 text-black" style={{
      fontFamily: "'Times New Roman', serif",
      color: '#000000',
      paddingLeft: '50px',
      paddingRight: '50px'
    }}>
      <header className="text-center mb-6" style={{
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <h1 className="text-2xl font-bold uppercase tracking-wider" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {data.personalInfo.name}
        </h1>
        
        <div className="mt-2 text-sm" style={{ marginTop: '8px', fontSize: '13px' }}>
          <span>{data.personalInfo.email}</span>
          <span className="mx-2" style={{ marginLeft: '8px', marginRight: '8px' }}>•</span>
          <span>{data.personalInfo.phone}</span>
          <span className="mx-2" style={{ marginLeft: '8px', marginRight: '8px' }}>•</span>
          <span>{data.personalInfo.location}</span>
          
          {data.personalInfo.linkedin && (
            <>
              <span className="mx-2" style={{ marginLeft: '8px', marginRight: '8px' }}>•</span>
              <span>{data.personalInfo.linkedin}</span>
            </>
          )}
          
          {data.personalInfo.github && (
            <>
              <span className="mx-2" style={{ marginLeft: '8px', marginRight: '8px' }}>•</span>
              <span>{data.personalInfo.github}</span>
            </>
          )}
        </div>
        
        <h2 className="mt-2 text-base font-medium" style={{
          marginTop: '8px',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          {data.personalInfo.title}
        </h2>
      </header>

      <section className="mb-6" style={{ marginBottom: '24px' }}>
        <h3 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3" style={{
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderBottomWidth: '1px',
          borderBottomColor: '#000000',
          paddingBottom: '4px',
          marginBottom: '12px'
        }}>
          Education
        </h3>
        
        <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between" style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <h4 className="font-bold" style={{ fontWeight: 'bold' }}>
                  {edu.school || 'University'}
                </h4>
                {edu.period && (
                  <span className="text-sm" style={{ fontSize: '13px' }}>
                    {edu.period}
                  </span>
                )}
              </div>
              <div className="italic" style={{ fontStyle: 'italic' }}>
                {edu.degree}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6" style={{ marginBottom: '24px' }}>
        <h3 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3" style={{
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderBottomWidth: '1px',
          borderBottomColor: '#000000',
          paddingBottom: '4px',
          marginBottom: '12px'
        }}>
          Experience
        </h3>
        
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4" style={{ marginBottom: '16px' }}>
            <div className="flex justify-between" style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <h4 className="font-bold" style={{ fontWeight: 'bold' }}>
                {exp.company}
                {exp.location ? `, ${exp.location}` : ""}
              </h4>
              {exp.period && (
                <span className="text-sm" style={{ fontSize: '13px' }}>
                  {exp.period}
                </span>
              )}
            </div>
            <div className="italic mb-2" style={{ fontStyle: 'italic', marginBottom: '8px' }}>
              {exp.title}
            </div>
            <ul className="pl-5 list-disc text-sm space-y-1" style={{
              paddingLeft: '20px',
              listStyleType: 'disc',
              fontSize: '13px'
            }}>
              {exp.highlights.map((highlight, idx) => (
                <li key={idx}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6" style={{ marginBottom: '24px' }}>
        <h3 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3" style={{
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderBottomWidth: '1px',
          borderBottomColor: '#000000',
          paddingBottom: '4px',
          marginBottom: '12px'
        }}>
          Summary
        </h3>
        <p className="text-sm" style={{ fontSize: '13px' }}>
          {data.personalInfo.summary}
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold uppercase border-b border-black pb-1 mb-3" style={{
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderBottomWidth: '1px',
          borderBottomColor: '#000000',
          paddingBottom: '4px',
          marginBottom: '12px'
        }}>
          Skills
        </h3>
        <p className="text-sm" style={{ fontSize: '13px' }}>
          {data.skills.join(', ')}
        </p>
      </section>
    </div>
  );
};

export default ResumeTemplate;
