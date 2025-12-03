export const typeDefs = `#graphql

type Student {
    id:ID!,
    name:String!,
    age:Int!,
    courses:[Course]  #many-to-many
}

type Course {
    id:ID!,
    title:String!,
    description:String!
    students:[Student]  #many-to-many
}

type Enrollment {
    id: ID!
    student: Student      # many-to-one
    course: Course        # many-to-one
    grade: String
  }


type Query {
    #simple query

    getStudents:[Student]
    getCourses:[Course]
    getEnrollments:[Enrollment]

    #fetch by Id

    getStudent(id: ID!) : Student
    getCourse(id: ID!) : Course

    #nested queries

    getStudentCourses(id: ID!) : [Course]
    getCourseStudents(id: ID!) : [Student]
}

type Mutation {
    createStudent(name: String!, age: Int!): Student
    createCourse(title: String!, description: String): Course
    enrollStudent(studentId: ID!, courseId: ID!, grade: String): Enrollment
  }

`;