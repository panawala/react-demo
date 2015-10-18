export default {
    index: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./../components/App'))
        })
    },
    custom_form: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./../components/CustomForm'))
        })
    },
    newform: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./../components/NewForm'))
        })
    },
    messages:(location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./../components/Messages'))
        })
    }
};
