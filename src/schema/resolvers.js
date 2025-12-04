import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";


export const resolvers = {
  Student: {
    courses: async (parent) => {
      const enrollments = await Enrollment.find({ studentId: parent.id });
      return await Course.find({ _id: { $in: enrollments.map(e => e.courseId) } });
    }
  },

  Course: {
    students: async (parent) => {
      const enrollments = await Enrollment.find({ courseId: parent.id });
      return await Student.find({ _id: { $in: enrollments.map(e => e.studentId) } });
    }
  },

  Enrollment: {
    student: async (parent) => await Student.findById(parent.studentId),
    course: async (parent) => await Course.findById(parent.courseId)
  },

  Query: {
    getStudents: async () => await Student.find({}),
    getCourses: async () => await Course.find({}),
    getEnrollments: async () => await Enrollment.find({}),

    getStudent: async (_, { id }) => await Student.findById(id),
    getCourse: async (_, { id }) => await Course.findById(id),

    getStudentCourses: async (_, { id }) => {
      const enrollments = await Enrollment.find({ studentId: id });
      return await Course.find({ _id: { $in: enrollments.map(e => e.courseId) } });
    },

    getCourseStudents: async (_, { id }) => {
      const enrollments = await Enrollment.find({ courseId: id });
      return await Student.find({ _id: { $in: enrollments.map(e => e.studentId) } });
    }
  },

  Mutation: {
    createStudent: async (_, { name, age }) => {
      const student = new Student({ name, age });
      return await student.save();
    },

    createCourse: async (_, { title, description }) => {
      const course = new Course({ title, description });
      return await course.save();
    },

    enrollStudent: async (_, { studentId, courseId, grade }) => {
      const enrollment = new Enrollment({ studentId, courseId, grade });
      return await enrollment.save();
    }
  }
};
