import Course from "../mongoose/courses/Course";

/**
 * @file Declares API for Courses related data access object methods
 */

export default interface CourseDao {
  findAllCourses(): Promise<Course[]>;
  findAllCoursesDeep(): Promise<Course[]>;
  findCourseById(cid: string): Promise<Course>;
  findCourseByIdDeep(cid: string): Promise<Course>;
  createCourse(course: Course): Promise<Course>;
  deleteCourse(cid: string): Promise<any>;
  updateCourse(cid: string, course: Course): Promise<any>;
  addSectionToCourse(cid: string, sid: string): Promise<any>;
  removeSectionFromCourse(cid: string, sid: string): Promise<any>;
}
