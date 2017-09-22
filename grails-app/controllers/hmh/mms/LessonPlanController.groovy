package hmh.mms

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class LessonPlanController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond LessonPlan.list(params), model:[lessonPlanCount: LessonPlan.count()]
    }

    def show(LessonPlan lessonPlan) {

        respond lessonPlan
    }

    @Transactional
    def save(LessonPlan lessonPlan) {
        if (lessonPlan == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (lessonPlan.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond lessonPlan.errors, view:'create'
            return
        }

        lessonPlan.save flush:true

        respond lessonPlan, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(LessonPlan lessonPlan) {
        if (lessonPlan == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (lessonPlan.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond lessonPlan.errors, view:'edit'
            return
        }

        lessonPlan.save flush:true

        respond lessonPlan, [status: OK, view:"show"]
    }

    @Transactional
    def delete(LessonPlan lessonPlan) {

        if (lessonPlan == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        lessonPlan.delete flush:true

        render status: NO_CONTENT
    }
}
