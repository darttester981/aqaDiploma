// Service для работы с API поиска городов tutu.ru
 
export class JuicyOffersService {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://www.tutu.ru/ptt/v1/suggest/search/';
  }

  /**
   * Получить список городов по типу транспорта
   * @param {string} transport - Тип транспорта ('ptt', 'train', 'bus')
   * @returns {Promise<Response>}
   */
  async getOffers(transport) {
    return await this.request.get(this.baseURL, {
      params: { transport },
      headers: {
        'features': '["juicyOffers"]',
        'accept': 'application/json, text/plain, */*'
      }
    });
  }

  /**
   * Получить города без параметров (для негативного теста)
   * @returns {Promise<Response>}
   */
  async getOffersWithoutParams() {
    return await this.request.get(this.baseURL, {
      headers: {
        'features': '["juicyOffers"]'
      }
    });
  }
}
