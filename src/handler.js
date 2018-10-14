'use strict';

const rp = require('request-promise-native');
const AWS = require("aws-sdk");

const putMonitoring = (value, metricName, namespace, unit) => {
	const cloudwatch = new AWS.CloudWatch();
	const params = {
		MetricData: [
		{
			MetricName: metricName,
			Unit: unit,
			Value: value,
			StorageResolution: 60
		},
		],
		Namespace: namespace,
	};

	return new Promise((res, rej) => cloudwatch.putMetricData(params, (err, result) => err && rej(err) || res(result)));
};

const getResponseLength = async (domain) => {
	try {
		const body = await rp(domain);

		return body.length;
	}catch(e) {
		return 0;
	}
};

const performMonitoring = async (domain, namespace) => {
	const responseLength = await getResponseLength(domain);

	return putMonitoring(responseLength, "ResponseLength", namespace, "Bytes")
};

module.exports.index = async (event, context, callback) => {
	try {
		const res = await Promise.all([
			performMonitoring("https://google.com", "google"),
		])
		callback(null, res);
	}catch(e) {
		callback(e);
	}
};
