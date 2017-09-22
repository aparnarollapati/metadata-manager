package hmh.mms


class ProductComponentInterceptor {


// TODO delete this if its not implemented
	ProductComponentInterceptor() {
		match(controller:"product", action:"update")
	}

	boolean before() {
		true
	}

	boolean after() { true }

	void afterView() {
		// no-op
	}

}
