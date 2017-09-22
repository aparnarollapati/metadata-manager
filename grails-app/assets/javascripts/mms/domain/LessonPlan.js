//= wrapped
angular
    .module("mms")
    .factory("LessonPlan", LessonPlan)

function LessonPlan(DomainServiceFactory) {
    return DomainServiceFactory("api/lessonplans/:id", {id: '@id',max: '-1'});
};
