import React, { useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import { ErrorWrapperHOCProps } from '../views/settings/promotions/types';
import { ErrorObjectInterface } from '../utils/api/type';
import { HtmlTooltip } from '../uiComponents/tooltip/HtmlToolTip';

export function ErrorWrapper<T>({ errors, children }: ErrorWrapperHOCProps<T>) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (errors.length > 0) setOpen(true);
  }, [errors]);

  const getErrors = (errorsMessages: ErrorObjectInterface[]) => (
    <ul>
      {errorsMessages.map((error: any) => (
        <li key={error.key}>
          {error.error}
        </li>
      ))}
    </ul>
  );

  return open
    ? (
      <HtmlTooltip
        title={getErrors(errors)}
        open={open}
        onClose={() => setOpen(false)}
        placement="bottom"
        TransitionComponent={Zoom}
        leaveDelay={2000}
        arrow
      >
        <div className="input-wrapper">
          {children}
        </div>
      </HtmlTooltip>
    )
    : (
      <div>
        {children}
      </div>
    );
}
