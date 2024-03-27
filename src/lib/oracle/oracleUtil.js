
/**
 * 비동기적으로 SQL 쿼리를 실행하고, 결과의 행(rows)을 반환합니다.
 * 이 함수는 주로 데이터를 변경하는 DML 작업(INSERT, UPDATE, DELETE)에 사용됩니다.
 * 실행 성공 후에는 변경사항을 커밋(commit)합니다.
 *
 * @param {string} query - 실행할 SQL 쿼리 문자열입니다.
 * @param {Object} binds - 쿼리에 바인딩할 변수들의 객체입니다.
 * @returns {Promise<Array>} 쿼리 실행 결과로 반환된 행들의 배열을 비동기적으로 반환합니다.
 * @throws {Error} SQL 쿼리 실행 중 발생한 에러를 처리하고, 사용자 정의 에러를 던집니다.
 * 
 * @author 정우현
 * @date 2024-03-20
 */
export const execute = async (query, binds) => {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
			query, 
			binds, 
			options
		);
        await connection.commit();
        return result.rows;
    } catch (error) {
        logger.error(`[${error.name}] ${error.message}`);
        if (connection) await connection.rollback();        
        throw new Error('Error in execute:', error);
    } finally {
        if (connection) await connection.release();
    }
};


/**
 * 비동기적으로 SQL 쿼리를 실행하고, 조회(SELECT) 결과의 행(rows)을 반환합니다.
 * 이 함수는 데이터 조회를 위해 사용되며, 쿼리 실행 결과를 바로 반환합니다.
 *
 * @param {string} query - 실행할 SQL 쿼리 문자열입니다.
 * @param {Object} binds - 쿼리에 바인딩할 변수들의 객체입니다.
 * @returns {Promise<Array>} 쿼리 실행 결과로 반환된 행들의 배열을 비동기적으로 반환합니다.
 * @throws {Error} SQL 쿼리 실행 중 발생한 에러를 처리하고, 사용자 정의 에러를 던집니다.
 * 
 * @author 정우현
 * @date 2024-03-20
 */
export const fetch = async (query,binds) => {
    let connection;
    try {
        connection = await getConnection();
		const result = await connection.execute(
			query,
			binds,
			options
		)		 
		return result.rows
	} catch (error) {
		logger.error(`[${error.name}] ${error.message}`)		
		throw new Error('Error in fetch:',error)
	} finally {		
		await connection.release()
	}
}