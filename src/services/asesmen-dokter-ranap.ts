import type { AsesmenDokterRanap, Response } from '@/type'

import { get } from './api'

const getAsesmenDokterRanap = async ({
    noreg,
}: {
    noreg: string
}): Promise<Response<AsesmenDokterRanap>> => {
    const response = await get(`/v1/asesmen-dokter-rawat-inap/${noreg}`)

    return response.data
}

export { getAsesmenDokterRanap, }
