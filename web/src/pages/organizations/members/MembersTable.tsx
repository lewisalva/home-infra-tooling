import { clsx } from 'clsx';

import { ContentHeader } from '../../../components/ContentHeader';
import { useOrganizationMembersContext } from '../../../contexts/useOrganizationMembersContext';
import { dayjs } from '../../../utilities/dayjs';

export const MembersTable = () => {
  const { organizationMembers, setSelectedOrganizationMemberId } = useOrganizationMembersContext();

  return (
    <>
      <ContentHeader title="Members">
        <button
          type="button"
          className="order-0 inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 sm:order-1 sm:ml-3"
        >
          Create
        </button>
      </ContentHeader>

      {/* Projects list (only on smallest breakpoint) */}
      {/* <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-sm font-medium text-gray-900">Projects</h2>
        </div>
        <ul role="list" className="mt-3 divide-y divide-gray-100 border-t border-gray-200">
          {organizationMembers?.map((member) => (
            <li key={member.userId}>
              <a
                href="#"
                className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
              >
                <span className="flex items-center space-x-3 truncate">
                  <span
                    className={clsx('h-2.5 w-2.5 flex-shrink-0 rounded-full')}
                    aria-hidden="true"
                  />
                  <span className="truncate text-sm font-medium leading-6">
                    {member.user.name}{' '}
                    <span className="truncate font-normal text-gray-500">
                      in {member.user.email}
                    </span>
                  </span>
                </span>
                <ChevronRightIcon
                  className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Projects table (small breakpoint and up) */}
      <div className="mt-8 hidden sm:block">
        <div className="inline-block min-w-full border-b border-gray-200 align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  <span className="lg:pl-2">Name</span>
                </th>
                <th
                  className="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                  scope="col"
                >
                  Last updated
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                  scope="col"
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {organizationMembers?.map((member) => (
                <tr key={member.userId}>
                  <td className="w-full max-w-0 whitespace-nowrap py-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <div
                        className={clsx('h-2.5 w-2.5 flex-shrink-0 rounded-full')}
                        aria-hidden="true"
                      />
                      <a href="#" className="truncate hover:text-gray-600">
                        <span>
                          {member.user.name}{' '}
                          <span className="font-normal text-xs text-gray-500">
                            {member.user.email}
                          </span>
                        </span>
                      </a>
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                    {dayjs(member.updatedAt).fromNow()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
