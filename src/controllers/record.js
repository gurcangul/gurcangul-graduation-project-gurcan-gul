const RecordValidator = require('../validators/recordValidator');
const RecordModel = require('../models/record');
const LogCode = require('../common/logCode');
const StatusCode = require('../common/statusCode');

module.exports = {
    fetch: async (req, res) => {

        // request body
        const { startDate, endDate, minCount, maxCount } = req.body;

        // validate request
        const { isValid, errors } = RecordValidator(req.body);

        // if error send response
        if (!isValid) {
            return res
                .status(StatusCode.INVALID_REQUEST)
                .send({ code: LogCode.INVALID_REQUEST, msg: 'Invalid request', errors });
        }

        try {
            const records = await RecordModel.aggregate([
                {
                    $project: {
                        _id: 0,
                        key: 1,
                        createdAt: 1,
                        totalCount: {
                            $sum: '$counts'
                        }
                    }
                },
                // filters the records using date and count
                {
                    $match: {
                        $and: [
                            {
                                createdAt: {
                                    $gte: new Date(startDate),
                                    $lte: new Date(endDate)
                                }
                            },
                            {
                                totalCount: {
                                    $gte: minCount,
                                    $lte: maxCount
                                }
                            }
                        ]
                    }
                },
                // sorts on count
                {
                    $sort: {
                        totalCount: 1
                    }
                }
            ]);

            // send response
            res
                .status(StatusCode.SUCCESS)
                .send({ code: LogCode.SUCCESS, msg: 'Success', records });
        } catch (error) {
            res
                .status(StatusCode.SERVER_ERROR)
                .send({ code: LogCode.SERVER_ERROR, msg: 'Internal Server Error' + error.message });
        }
    }
};