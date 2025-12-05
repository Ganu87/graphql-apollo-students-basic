import StudentSchema from "../models/Student.js";
import CourseSchema from "../models/Course.js";
import EnrollmentSchema from "../models/Enrollment.js";


export const resolvers = {
  Student: {
    courses: async (parent) => {
      const enrollments = await EnrollmentSchema.find({ studentId: parent.id });
      return await CourseSchema.find({ _id: { $in: enrollments.map(e => e.courseId) } });
    }
  },

  Course: {
    students: async (parent) => {
      const enrollments = await EnrollmentSchema.find({ courseId: parent.id });
      return await StudentSchema.find({ _id: { $in: enrollments.map(e => e.studentId) } });
    }
  },

  Enrollment: {
    student: async (parent) => await StudentSchema.findById(parent.studentId),
    course: async (parent) => await CourseSchema.findById(parent.courseId)
  },

  Query: {
    getStudents: async () => await StudentSchema.find({}),
    getCourses: async () => await CourseSchema.find({}),
    getEnrollments: async () => await EnrollmentSchema.find({}),

    getStudent: async (_, { id }) => await StudentSchema.findById(id),
    getCourse: async (_, { id }) => await CourseSchema.findById(id),

    getStudentCourses: async (_, { id }) => {
      const enrollments = await EnrollmentSchema.find({ studentId: id });
      return await CourseSchema.find({ _id: { $in: enrollments.map(e => e.courseId) } });
    },

    getCourseStudents: async (_, { id }) => {
      const enrollments = await EnrollmentSchema.find({ courseId: id });
      return await StudentSchema.find({ _id: { $in: enrollments.map(e => e.studentId) } });
    }
  },

  Mutation: {
    createStudent: async (_, { name, age }) => {
      const student = new StudentSchema({ name, age });
      return await student.save();
    },

    createCourse: async (_, { title, description }) => {
      const course = new CourseSchema({ title, description });
      return await course.save();
    },

    enrollStudent: async (_, { studentId, courseId, grade }) => {
      const enrollment = new EnrollmentSchema({ studentId, courseId, grade });
      return await enrollment.save();
    }
  }
};
