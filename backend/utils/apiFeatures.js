class ApiFeatures {
    constructor(query = null, queryStr = null) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: 'i',
                  },
              }
            : {};
        this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const allFilterQuery = { ...this.queryStr };

        //  Remove feild from category

        const removeFeilds = ['keyword', 'page', 'limit'];

        removeFeilds.forEach((key) => delete allFilterQuery[key]);

        // Filter for price and rating

        let queryStr = JSON.stringify(allFilterQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(productPerPage) {
        const currentPage = Number(this.queryStr.page) || 0;
        const skip = currentPage * productPerPage;
        this.query.limit(productPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;
