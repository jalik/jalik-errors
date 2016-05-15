/**
 * The collection of errors
 * @type {Mongo.Collection}
 */
Meteor.errors = new Mongo.Collection(null);

/**
 * The error helper
 */
class ErrorHelper {

    constructor() {
        this.id = Date.now();
    }

    /**
     * Adds an error
     * @param err
     * @return {*}
     */
    add(err) {
        err = {
            createdAt: new Date(),
            helperId: this.id,
            message: err.reason || err.message
        };
        return Meteor.errors.insert(err);
    }

    /**
     * Removes errors matching filters
     * @param filters
     */
    clear(filters) {
        filters = _.extend({}, filters, {
            helperId: this.id
        });
        return Meteor.errors.remove(filters);
    }

    /**
     * Returns errors matching filters
     * @param filters
     * @param options
     * @return {Mongo.Cursor}
     */
    find(filters, options) {
        filters = _.extend({}, filters, {
            helperId: this.id
        });
        options = _.extend({
            sort: {createdAt: -1}
        }, options);
        return Meteor.errors.find(filters, options);
    }
}

// Export class to the browser
if (typeof window !== 'undefined') {
    window.ErrorHelper = ErrorHelper;
}

export {ErrorHelper};
