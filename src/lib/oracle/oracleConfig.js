/** @type {import('@sveltejs/kit').Config} */
const dbConfig = {
	user: process.env.NODE_ORACLEDB_USER ,
	password: process.env.NODE_ORACLEDB_PASSWORD ,
	connectString: process.env.NODE_ORACLEDB_CONNECTSTRING ,
	externalAuth: false,
	poolMin: 1,
	poolMax: 2,
	poolTimeout: 1000
}

let init = false
const initOracleClient = async () => {
	try {
		await oracledb.initOracleClient({ libDir: './src/lib/oracle/instantclient_21_7' })
		init = true
	} catch (error) {
		logger.error('%o', error)
	}
}

let pool
const createPool = async () => {
	pool = await oracledb.createPool(dbConfig)
}

// 데이터베이스 연결 가져오기
export const getConnection = async () => {
	if (!init) await initOracleClient()
	if (!pool) await oracledb.createPool(dbConfig)	
	return await pool.getConnection()
}

export const options = { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: false, batchErrors: true }

