import * as React from 'react';
import classNames from 'classnames';
import { SolidShadowContainer, SolidShadowBtn } from './ButtonStyle';

const SolidShadowButton: React.FunctionComponent<Props> = ({
  children,
  className,
  theme,
  disabled,
  block,
  small,
  tag,
  forwardedRef,
  ...defaultProps
}) => (
  <SolidShadowContainer
    className={classNames('aries-solid-shadow-btn', className)}
    theme={theme}
    disabled={disabled}
    block={block}
  >
    <SolidShadowBtn
      ref={forwardedRef}
      className="solid-shadow-btn-content"
      theme={theme}
      disabled={disabled}
      block={block}
      small={small}
      as={(tag as React.ElementType) || 'button'}
      {...defaultProps}
    >
      {children}
    </SolidShadowBtn>
  </SolidShadowContainer>
);

interface Props extends React.ComponentPropsWithoutRef<typeof SolidShadowBtn> {
  children: React.ReactNode;
  className: string;
  theme?: string;
  disabled?: boolean;
  block?: boolean;
  small?: boolean;
  tag?: React.ElementType;
}

const forwardRef = (props: Props, ref: React.RefObject<HTMLButtonElement>) => (
  <SolidShadowButton {...props} forwardedRef={ref} />
);

forwardRef.displayName = SolidShadowButton.name;

export default React.forwardRef(forwardRef);
