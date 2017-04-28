import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Table} from 'react-bootstrap';
import GaugeWrapper from './GauageWrapper';
import {CurrentGauge, PercentageGauge, VoltageGauge} from './Gauge';


class DeviceBmv700 extends Component {

    static propTypes = {
        numericValues: PropTypes.object.isRequired,
    };

    getNiceName = (name) => name.replace(/([A-Z])/g, ' $1');

    render() {
        const numericValues = this.props.numericValues;

        const StateOfCharge = numericValues.StateOfCharge;
        const MainVoltage = numericValues.MainVoltage;
        const Current = numericValues.Current;
        const Power = numericValues.Power;

        return (
            <div>
                <Row>
                    <Col key="StateOfCharge" xs={8}>
                        <GaugeWrapper name="State of Charge"
                                      value={StateOfCharge.Value}
                                      unit={StateOfCharge.Unit}>
                            <PercentageGauge value={StateOfCharge.Value}/>
                        </GaugeWrapper>
                    </Col>
                    <Col key="MainVoltage" xs={4}>
                        <GaugeWrapper name="Voltage"
                                      value={MainVoltage.Value}
                                      unit={MainVoltage.Unit}>
                            <VoltageGauge value={MainVoltage.Value}
                                          unit={MainVoltage.Unit}
                            />
                        </GaugeWrapper>
                    </Col>
                </Row>
                <Row>
                    <Col key="Current" xs={6}>
                        <GaugeWrapper name="Current"
                                      value={Current.Value}
                                      unit={Current.Unit}>
                            <CurrentGauge value={Current.Value}
                                          unit={Current.Unit}
                            />
                        </GaugeWrapper>
                    </Col>
                    <Col key="Power" xs={6}>
                        <GaugeWrapper name="Power"
                                      value={Power.Value}
                                      unit={Power.Unit}>
                            <CurrentGauge value={Power.Value / 1000}
                                          unit={'k' + Power.Unit}
                                          range={3}
                            />
                        </GaugeWrapper>
                    </Col>
                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Value</th>
                            <th>Unit</th>
                        </tr>
                        </thead>
                        <tbody>
                            {Object.keys(numericValues).map(
                                (key) =>
                                <tr key={key}>
                                    <td className="text-right">{this.getNiceName(key)}</td>
                                    <td className="text-right">{numericValues[key].Value}</td>
                                    <td>{numericValues[key].Unit}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>
            </div>
        );
    }
}

export default DeviceBmv700;