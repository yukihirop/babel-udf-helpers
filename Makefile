.PHONY: all-deps
all-deps:
	yarn build
	cd example/js/babel-transform-plugin-sample && yarn && cd -
	cd example/ts/babel-transform-plugin-sample && yarn && cd -

.PHONY: example-test
example-test: all-deps
	cd example/js/babel-transform-plugin-sample && yarn test && cd -
	cd example/ts/babel-transform-plugin-sample && yarn test && cd -

