import { NextApiRequest, NextApiResponse } from 'next';

export async function checkSecret(req: NextApiRequest, res: NextApiResponse) {
    
    const { secret } = req.body;

    if (!secret) {
        return res.status(400).json({ message: 'Secret is required' });
    }

    const isValid = secret === process.env.SECRET_PASS;

    return res.status(200).json({ isValid });
    
}