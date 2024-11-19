import prisma from '@/prisma';

const formatNameForEmail = (fullName: string): string => {
  // Split the name into parts, remove extra spaces
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);

  if (parts.length === 0) return '';

  // Use the last name as the starting point (first letter)
  const lastName = parts.pop()?.toLowerCase() || '';

  // Combine initials of first and middle names
  const initials = parts.map((part) => part[0].toLowerCase()).join('');

  // Concatenate initials with the last name
  return `${lastName}${initials}`;
};

const generateAccountEmail = async (name: string): Promise<string> => {
  const baseEmail = `${formatNameForEmail(name)}@tmu.edu.vn`;

  // Check if email exists
  const existingAccounts = await prisma.account.findMany({
    where: {
      email: {
        startsWith: formatNameForEmail(name),
        endsWith: '@tmu.edu.vn',
      },
    },
  });

  if (existingAccounts.length === 0) {
    return baseEmail;
  }

  // If email exists, add number suffix
  return `${formatNameForEmail(name)}${existingAccounts.length + 1}@tmu.edu.vn`;
};

const generatePassword = (name: string, code: string): string => {
  const formattedName = formatNameForEmail(name);
  return `${formattedName}@${code}`;
};

export { formatNameForEmail, generateAccountEmail, generatePassword };
