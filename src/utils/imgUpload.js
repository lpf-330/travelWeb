import axios from "axios";

/**
 * 图片上传
 * @param {String} url 后端API地址
 * @param {String} name 目标的字段名（如'user_id'）
 * @param {String} value 目标的id值
 * @param {File} imgFile 图片文件
 * @returns {String} 图片渲染的url
 */
export const imgUpload = async (url, name, value, imgFile) => {
    const formData = new FormData();
    formData.append(name, value)
    formData.append('file', imgFile);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data

    } catch (error) {
        throw error
    }

};
