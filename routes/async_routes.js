export default {
    index: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./../components/App'))
        })
    },
    calender: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./../components/Calendar'))
        })
    },
    grades: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./../components/Grades'))
        })
    },
    messages:(location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./../components/Messages'))
        })
    },
};
