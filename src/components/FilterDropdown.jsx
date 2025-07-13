import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export default function FilterDropdown({ label, options, selected, setSelected }) {
  return (
    <div className="w-32 text-sm">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-teal-950 dark:bg-teal-50 text-white dark:text-gray-900 py-2 pl-3 pr-10 text-left shadow-md hover:bg-teal-900 dark:hover:bg-teal-100">
            <span className="block truncate">{selected || `All ${label}`}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-4 w-4 text-white dark:text-gray-800" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-teal-50  dark:text-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10 dark:hover:bg-gray-400">
            <Listbox.Option value="" className="cursor-pointer select-none px-4 py-2 hover:bg-teal-100">
              All {label}
            </Listbox.Option>
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  clsx(
                    "cursor-pointer select-none px-4 py-2",
                    active ? "bg-teal-100 dark:bg-gray-600" : ""
                  )
                }
              >
                {({ selected }) => (
                  <span className={clsx("block truncate", selected && "font-medium")}>
                    {option}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
