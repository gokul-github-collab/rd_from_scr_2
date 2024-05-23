import { useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
  body: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  bol: {
    fontWeight: 'bold',
  },
  headerSection: {
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  jobDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  jobDetailItem: {
    marginRight: 10,
    padding: '2px 5px',
    border: '1px solid #ddd',
    fontSize: 12,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionButton: {
    padding: '2px 5px',
    marginRight: 5,
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontSize: 12,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    wrap: false, // Prevent breaking within the row
    pageBreakInside: 'avoid',
    pageBreakAfter: "auto",
  },
  tableCol: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableColSno: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  header: {
    backgroundColor: "#f2f2f2",
    padding: 5,
    fontWeight: "bold",
    color: "#000",  // Set the color to black
  },
  moduleHeader: {
    backgroundColor: "#f9f9f9",
    padding: 5,
    fontWeight: "bold",
    color: "#000",  // Set the color to black
  },
  colSmall: {
    width: '20%', // Adjust as needed
  },
  pageBreakLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

const SubjectDetailPDF = ({ sid }) => {
  const [totalHours, setTotalHours] = useState(0);

  const [subject, setSubject] = useState(null);
  const [semester, setSemester] = useState(null)
  const [course, setCourse] = useState(null)
  const [syllabus, setSyllabus] = useState(null)

  useEffect(() => {
    getSubject(sid);
  }, [sid]);

  const getCourse = (id) => {
    api.get(`/api/courses/${id}/`).
      then(res => setCourse(res.data)).
      catch((err) => console.error(err))
  }
  const getSyllabus = (id) => {
    api.get(`/api/syllabus/${id}/`).
      then(res => { setSyllabus(res.data); }).
      catch((err) => console.error(err))
  }
  const getSemester = (id) => {
    api.get(`/api/semester/${id}/`).
      then(res => { setSemester(res.data); getCourse(res.data.course); getSyllabus(res.data.syllabus) }).
      catch((err) => console.error(err))
  }
  const getSubject = (sid) => {
    api.get(`/api/subject/${sid}/`)
        .then((res) => {
          getSemester(res.data.semester);
          setSubject(res.data);
          if (res.data.cc) {
            const hours = res.data.cc.reduce((sum, module) => sum + (module.hrs_pw || 0), 0);
            setTotalHours(hours);
          }
        })
        .catch(err => toast.error(err));
  };

  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const handleContentHeight = () => {
      const contentDiv = document.getElementById('content');
      if (contentDiv) {
        setContentHeight(contentDiv.clientHeight);
      }
    };
    window.addEventListener('resize', handleContentHeight);
    handleContentHeight();
    return () => window.removeEventListener('resize', handleContentHeight);
  }, []);

  return (
    <Document>
      <Page style={styles.body}>
        <View id='content'>
          <Text style={[styles.tableCell, { textTransform: 'uppercase', fontSize: 8 }]}>
            REGULATION {course ? course.name : ""}
          </Text>
          <View style={styles.table}>
            <View style={styles.pageBreakLine}>

            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColSno}>
                <Text style={styles.tableCell}>{subject ? subject.course_code : ""}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{subject ? subject.name : ""}</Text>
              </View>
              <View style={styles.tableColSno}>
                <Text style={styles.tableCell}>{subject ? subject.ltpc : ""}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.bol]}>Nature of the Course</Text>
                <Text style={[styles.tableCell, styles.bol]}>Theory - (External Mark: {subject ? subject.external_mark : ""} / Internal Mark: {subject ? subject.internal_mark : ""})</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.bol]}>Pre-requisite(s): {subject ? subject.prerequisite : ""}</Text>
              </View>
            </View>
            {/*  */}

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.header]}>Course Objectives:</Text>
              </View>
            </View>
            {subject && subject.cob && subject.cob.map((cob, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableColSno}>
                  <Text style={styles.tableCell}>{index + 1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{cob.name}</Text>
                </View>

              </View>
            ))}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.header]}>Course Outcomes:</Text>
                <Text style={[styles.tableCell]}>Upon completion of the course, students shall have ability to</Text>
              </View>
            </View>
            {subject && subject.co && subject.co.map((co, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableColSno}>
                  <Text style={styles.tableCell}>{co.title}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{co.description}</Text>
                </View>
                <View style={styles.tableColSno}>
                  <Text style={styles.tableCell}>{co.uap}</Text>
                </View>
              </View>
            ))}
          </View>
          {/*  */}
          <View style={styles.table}>



            {/*  */}


            {subject && (subject.t_or_p === "Theory" || subject.t_or_p === "Theory and Practical") && (
              <React.Fragment>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.header]}>Course Content:</Text>
                  </View>
                </View>
                {subject.cc && subject.cc.map((cc, index) => (
                  <React.Fragment key={index}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={[styles.tableCell, styles.moduleHeader]}>
                          Module {index + 1}: {cc.title} - {cc.hrs_pw} Hrs
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{cc.description}</Text>
                      </View>
                    </View>
                  </React.Fragment>
                ))}
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Total Hours(L): {totalHours}</Text>
                  </View>
                </View>
              </React.Fragment>
            )}

            {subject && (subject.t_or_p === "Practical" || subject.t_or_p === "Theory and Practical") && (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.header]}>Lap Component</Text>
                  </View>
                </View>

                {subject && subject.lab && subject.lab.map((lab, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableColSno}>
                      <Text style={styles.tableCell}>{index + 1}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{lab.lie}</Text>
                    </View>
                    <View style={styles.tableColSno}>
                      <Text style={styles.tableCell}>{lab.co_mapping}</Text>
                    </View>
                    <View style={styles.tableColSno}>
                      <Text style={styles.tableCell}>{lab.rbt}</Text>
                    </View>
                  </View>
                ))}



              </>

            )
            }



            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.header]}>Text Book Reference</Text>
              </View>
            </View>

            {subject && subject.tb && subject.tb.map((tb, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableColSno}>
                  <Text style={styles.tableCell}>{index + 1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{tb.name}</Text>
                </View>
              </View>
            ))}

            {/*  */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.header]}>Reference Book</Text>
              </View>
            </View>
            {subject && subject.rb && subject.rb.map((rb, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableColSno}>
                  <Text style={styles.tableCell}>{index+1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{rb.name}</Text>
                </View>
              </View>
            ))}

            {/*  */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.header]}>Website Reference</Text>
              </View>
            </View>
            {subject && subject.wr && subject.wr.map((wr, index) => (
              <View style={styles.tableRow} key={index }>
                <View style={styles.tableColSno}>
                  <Text style={styles.tableCell}>{index+ 1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{wr.url}</Text>
                </View>
              </View>
            ))}

            {/*  */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.header]}>Online Reference</Text>
              </View>
            </View>
            {subject && subject.oref && subject.oref.map((oref, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableColSno}>
                  <Text style={styles.tableCell}>{index + 1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{oref.url}</Text>
                </View>
              </View>
            ))}
          </View>
          {/*  */}
          <View style={styles.pageBreakLine} ></View>
          <Text style={[styles.tableCell, { textTransform: 'uppercase', fontSize: 8 }]}>
            APPLICABLE FOR STUDENTS ADMITTED FROM {syllabus ? syllabus.year : ""}
          </Text>
          {/* {contentHeight > 720 && <View style={styles.pageBreakLine} />} */}
        </View>
      </Page>
    </Document>
  );
};

export default SubjectDetailPDF;
