module.exports = {
    default: {
        paths: ['tests/features/*.feature'],
        require: [
            'ts-node/register',
            'tests/steps/*.ts',
            "tests/support/hooks/*.ts",
        ],
        formatOptions: {
            snippetInterface: 'async-await',
        },
        format: [
            ['html', 'cucumber-report.html'],
            'summary',
            'progress-bar',
            'json:./cucumber-report.json',
        ],
    },
};
