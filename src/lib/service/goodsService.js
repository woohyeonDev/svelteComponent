import goodsRepository from "../repository/goodsRepository";

export default class goodsService {

    /**
     * 최대 시퀀스 데이터를 조회합니다.
     *
     * @param {Object} obj - 조회에 사용될 조건을 담은 객체입니다.
     * @param {string} obj.msNo - 조회할 값입니다.
     * @returns {string} 조회된 데이터 배열을 비동기적으로 반환합니다.
     * @throws {Error} 데이터베이스 조회 과정에서 에러가 발생한 경우, 에러 객체를 throw합니다.
     * 
     * @author 정우현
     * @date 2024-03-20
     */
    static async getMaxSeq(obj) {
        try {
            const rows = await goodsRepository.findMaxSeq(obj);
            const maxSeq = rows[0].MAX_SEQ ;
            return maxSeq;
        } catch (error) {
            console.error('Error in getMaxSeq:', error);
            throw error; 
        }
    }

    /**
     * 마스터 데이터를 조회합니다.
     *
     * @param {Object} obj - 조회에 사용될 조건을 담은 객체입니다.
     * @param {string} obj.msNo - 조회할 값입니다.
     * @returns {Promise<Array>} 조회된 데이터 배열을 비동기적으로 반환합니다.
     * @throws {Error} 데이터베이스 조회 과정에서 에러가 발생한 경우, 에러 객체를 throw합니다.
     * 
     * @author 정우현
     * @date 2024-03-20
     */
    static async getAllMaster(obj) {
        try {
            const rows = await goodsRepository.findAllMaster(obj);
            return rows; 
        } catch (error) {
            console.error('Error in getAllBarcodeMaster:', error);
            throw error;
        }
    }
    
    /**
     * 마스터 데이터를 시퀀스에 따라 조회합니다.
     *
     * @param {Object} obj - 조회에 사용될 조건을 담은 객체입니다.
     * @param {string} obj.msNo - 조회할 값입니다.
     * @param {string} obj.lastSeq - 조회할 값입니다.
     * @returns {Promise<Array>} 조회된 바코드 마스터 데이터 배열을 비동기적으로 반환합니다.
     * @throws {Error} 데이터베이스 조회 과정에서 에러가 발생한 경우, 에러 객체를 throw합니다.
     * 
     * @author 정우현
     * @date 2024-03-20
     */
    static async getSeqMaster(obj) {
        try {
            const rows = await goodsRepository.findSeqMaster(obj);            
            return rows;
        } catch (error) {
            console.error('Error in getSeqBarcodeMaster:', error);
            throw error;
        }
    }

}