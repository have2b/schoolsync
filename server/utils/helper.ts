import prisma from '@/prisma';
import slugify from 'slugify';

const formatNameForEmail = (fullName: string): string => {
  // Split into parts
  const parts = fullName.split(' ').filter((part) => part.length > 0);
  if (parts.length === 0) return '';

  // Use slugify to handle Vietnamese characters
  return slugify(fullName, {
    lower: true, // Convert to lowercase
    strict: true, // Strip special characters except replacement
    locale: 'vi', // Use Vietnamese locale
    trim: true, // Trim leading and trailing replacement chars
  });
};

const generateAccountEmail = async (name: string): Promise<string> => {
  const baseEmail = `${formatNameForEmail(name)}@uni.vn`;

  // Check if email exists
  const existingAccounts = await prisma.account.findMany({
    where: {
      email: {
        startsWith: formatNameForEmail(name),
        endsWith: '@uni.vn',
      },
    },
  });

  if (existingAccounts.length === 0) {
    return baseEmail;
  }

  // If email exists, add number suffix
  return `${formatNameForEmail(name)}${existingAccounts.length + 1}@uni.vn`;
};

const generatePassword = (name: string, code: string): string => {
  // Create a password combining name, code
  const formattedName = formatNameForEmail(name);
  return `${formattedName}@${code}`;
};

export { formatNameForEmail, generateAccountEmail, generatePassword };
