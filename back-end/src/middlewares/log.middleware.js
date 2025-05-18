const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const appendFileAsync = promisify(fs.appendFile);
const mkdirAsync = promisify(fs.mkdir);

const logDirPath = path.join(__dirname, '../logs');
const logFilePath = path.join(logDirPath, 'request.log');

const ensureLogDirectory = async () => {
    try {
        await mkdirAsync(logDirPath, { recursive: true });
    } catch (error) {
        if (error.code !== 'EEXIST') {
            console.error('Erro ao criar diretório de logs:', error);
        }
    }
};

ensureLogDirectory();

const logRequest = async (request, response, next) => {
    const logEntry = `[${new Date().toISOString()}] ${request.method} - ${request.url}\n`;

    appendFileAsync(logFilePath, logEntry)
        .then(() => {
            console.log('Log gravado com sucesso:', logEntry);
        })
        .catch(error => {
            console.error('Erro ao gravar o log:', error);
        });

    next();
};

module.exports = { logRequest }